import {
  collectMotionTargets,
  ENABLED_MOTION_PAGES,
  getPageKind,
  MOTION,
} from "./pageMotionTargets.js";

/**
 * Native Web Animations + IntersectionObserver; no animation-package install.
 *
 * IMPORTANT: animations use individual translate / scale / rotate properties.
 * They never overwrite the transform used by the existing timeline centering,
 * project-card tilt, envelope positioning or hover effects. No layout styles,
 * HTML content, class names, event behavior or inline styles are rewritten.
 *
 * All entrances are finite and once per mount. Waiting opacity is temporary
 * animation state, NOT CSS or an inline-style rewrite. Cleanup, keyboard focus,
 * printing, reduced motion and failed enhancement restore the original content.
 */
export function createPageMotion(page) {
  const view = page?.ownerDocument?.defaultView;
  if (
    !view || !page.isConnected ||
    typeof page.animate !== "function" ||
    typeof view.IntersectionObserver !== "function" ||
    !view.CSS?.supports("translate", "0px 0px") ||
    view.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !ENABLED_MOTION_PAGES.includes(getPageKind(page))
  ) return () => {};

  const doc = page.ownerDocument;
  const finePointer = view.matchMedia("(hover: hover) and (pointer: fine)");
  const reveals = new Map();
  const bindings = new Map();
  const idleGroups = new Map();
  const animations = new Set();
  const lanes = new WeakMap();
  const neutralPositions = new WeakMap();
  let disposed = false;
  let scanQueued = false;
  let watchedCard = null;
  let cardObserver = null;

  const isOnScreen = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.bottom > 0 &&
      rect.top < view.innerHeight && rect.right > 0 && rect.left < view.innerWidth;
  };
  const neutral = (element) => {
    if (!neutralPositions.has(element)) {
      const value = view.getComputedStyle(element).translate;
      neutralPositions.set(element, value === "none" ? "0px 0px" : value);
    }
    return neutralPositions.get(element);
  };

  function run(element, frames, {
    lane = "entrance", persistent = false, onEnd,
    duration = MOTION.revealDuration, delay = 0, ...timing
  } = {}) {
    if (disposed || !element.isConnected) return null;
    let slots = lanes.get(element);
    if (!slots) {
      slots = new Map();
      lanes.set(element, slots);
    }
    slots.get(lane)?.cancel();
    let animation;
    try {
      animation = element.animate(frames, {
        duration, delay, easing: MOTION.entranceEasing,
        fill: persistent ? "both" : "backwards",
        ...timing,
      });
    } catch {
      // A browser-specific animation failure must never break page interaction.
      onEnd?.();
      return null;
    }
    animations.add(animation);
    slots.set(lane, animation);
    let ended = false;
    const release = () => {
      if (ended) return;
      ended = true;
      animations.delete(animation);
      if (slots.get(lane) === animation) slots.delete(lane);
      if (!disposed) onEnd?.();
    };
    animation.oncancel = release;
    animation.onfinish = () => {
      if (!persistent) {
        release();
        animation.cancel();
      }
    };
    return animation;
  }

  function entranceFrames(element, record) {
    const style = view.getComputedStyle(element);
    const opacity = style.opacity;
    const type = record.type || "rise";
    const canScale = style.scale === "none";
    if (type === "node") {
      if (!canScale) return [{ opacity: 0 }, { opacity }];
      return [
        { opacity: 0, scale: String(MOTION.nodeStartScale),
          easing: MOTION.entranceEasing },
        { opacity, scale: String(MOTION.nodeOvershootScale), offset: 0.7,
          easing: "ease-out" },
        { opacity, scale: "1" },
      ];
    }
    const start = { opacity: 0 };
    const end = { opacity };
    const canTranslate = type !== "fade" && style.translate === "none";
    const distance = record.distance ?? MOTION.textDistance;
    // Preserve independent translate / scale values provided by the site itself.
    if (canTranslate) {
      start.translate = `0px ${distance}px`;
      end.translate = "0px 0px";
    }
    if (type === "pop" && canScale) {
      start.scale = String(MOTION.popStartScale);
      end.scale = "1";
    }
    if (type === "pop" || type === "title") {
      const settle = { ...end, offset: 0.74, easing: "ease-out" };
      if (canTranslate) {
        settle.translate = `0px ${-Math.sign(distance) * MOTION.settlePixels}px`;
      }
      if (type === "pop" && canScale) {
        settle.scale = String(MOTION.popOvershootScale);
      }
      start.easing = MOTION.entranceEasing;
      return [start, settle, end];
    }
    return [start, end];
  }

  function startReveal(record) {
    const element = record.element;
    if (record.played) return;
    record.played = true;
    revealObserver.unobserve(element);
    // Release the temporary hidden state BEFORE reading the original opacity.
    // Both operations happen in one task, so there is no visible flash.
    record.waiting?.cancel();
    record.waiting = null;
    if (doc.hidden || element.contains(doc.activeElement)) {
      record.settled = true;
      syncIdle();
      return;
    }
    record.animation = run(element, entranceFrames(element, record), {
      duration: record.duration ?? (
        record.type === "pop" ? MOTION.popDuration : MOTION.revealDuration
      ),
      delay: record.delay ?? 0,
      easing: ["pop", "node", "title"].includes(record.type)
        ? "linear" : MOTION.entranceEasing,
      onEnd: () => { record.settled = true; syncIdle(); },
    });
  }

  function syncIdle() {
    if (disposed) return;
    for (const [anchor, group] of idleGroups) {
      const entrance = reveals.get(anchor);
      const ready = !entrance || entrance.settled;
      // Start the float only AFTER the entrance has released translate.
      // A paused float at time zero would otherwise mask the initial rise.
      if (ready && anchor.isConnected && !group.animations.has(anchor)) {
        const amount = MOTION.radarFloatPixels;
        const float = run(anchor, [
          { translate: "0px 0px" },
          { translate: `0px -${amount}px` },
          { translate: "0px 0px" },
          { translate: `0px ${amount}px` },
          { translate: "0px 0px" },
        ], {
          lane: "idle", duration: MOTION.radarFloatDuration,
          iterations: Infinity, easing: "ease-in-out",
        });
        if (float) {
          float.pause();
          float.currentTime = 0;
          group.animations.set(anchor, float);
        }
      }
      for (const [element, animation] of group.animations) {
        if (!element.isConnected) {
          animation.cancel();
          group.animations.delete(element);
          continue;
        }
        if (group.visible && ready && !doc.hidden) animation.play();
        else animation.pause();
      }
    }
  }

  const revealObserver = new view.IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const record = reveals.get(entry.target);
      if (!record || record.played) continue;
      // Wait for a meaningful visible slice; do not finish below the viewport.
      // Extremely tall/wide targets use their maximum possible visible fraction.
      const bounds = entry.boundingClientRect;
      const root = entry.rootBounds;
      const maxRatio = root && bounds.width > 0 && bounds.height > 0
        ? Math.min(1, root.width / bounds.width) *
          Math.min(1, root.height / bounds.height)
        : 1;
      const threshold = Math.min(MOTION.revealThreshold, maxRatio * 0.5);
      if (entry.intersectionRatio < threshold) continue;
      startReveal(record);
    }
  }, {
    rootMargin: "0px",
    threshold: [0, 0.01, 0.05, 0.1, MOTION.revealThreshold],
  });

  const idleObserver = new view.IntersectionObserver((entries) => {
    for (const entry of entries) {
      const group = idleGroups.get(entry.target);
      if (group) group.visible = entry.isIntersecting;
    }
    syncIdle();
  }, { threshold: 0.01 });

  function settleAncestors(element) {
    for (const [target, record] of reveals) {
      if (!record.settled && (target === element || target.contains(element))) {
        record.played = true;
        record.settled = true;
        revealObserver.unobserve(target);
        record.waiting?.cancel();
        record.waiting = null;
        record.animation?.cancel();
      }
    }
    syncIdle();
  }

  function bindInteraction(record) {
    const { element, hover, target, press } = record;
    if (bindings.has(element)) return;
    const off = [];
    let hovered = false;
    let focused = false;
    let active = false;
    const listen = (name, handler) => {
      element.addEventListener(name, handler);
      off.push(() => element.removeEventListener(name, handler));
    };
    const getTarget = () => target ? element.querySelector(target) : element;

    function updateHover() {
      const next = hovered || focused;
      if (next === active) return;
      active = next;
      const surface = getTarget();
      if (!surface || !hover) return;
      settleAncestors(surface);
      if (hover === "sway") {
        if (next) run(surface, [
          { rotate: "0deg", transformOrigin: "50% 0%" },
          { rotate: `-${MOTION.swayDegrees}deg`, transformOrigin: "50% 0%" },
          { rotate: `${MOTION.swayDegrees * 0.7}deg`, transformOrigin: "50% 0%" },
          { rotate: `-${MOTION.swayDegrees * 0.3}deg`, transformOrigin: "50% 0%" },
          { rotate: "0deg", transformOrigin: "50% 0%" },
        ], { lane: "interaction", duration: MOTION.swayDuration, easing: "ease-in-out" });
      } else {
        const base = neutral(surface);
        const current = view.getComputedStyle(surface).translate;
        run(surface, [
          { translate: current === "none" ? base : current },
          { translate: next ? `0px -${MOTION.hoverLift}px` : base },
        ], { lane: "interaction", duration: MOTION.hoverDuration, persistent: next });
      }
    }

    if (hover) {
      listen("pointerenter", (event) => {
        if (event.pointerType === "mouse" && finePointer.matches) {
          hovered = true;
          updateHover();
        }
      });
      listen("pointerleave", () => { hovered = false; updateHover(); });
      listen("focusin", () => { focused = true; updateHover(); });
      listen("focusout", (event) => {
        if (!element.contains(event.relatedTarget)) {
          focused = false;
          updateHover();
        }
      });
    }
    if (press) listen("click", () => {
      if (element.matches(":disabled, [aria-disabled='true']")) return;
      settleAncestors(element);
      const base = neutral(element);
      const current = view.getComputedStyle(element).translate;
      const lifted = active && !target && hover === "lift";
      run(element, [
        { translate: current === "none" ? base : current },
        { translate: `0px ${MOTION.pressDistance}px`, offset: 0.4 },
        { translate: lifted ? `0px -${MOTION.hoverLift}px` : base },
      ], { lane: "interaction", duration: MOTION.pressDuration, persistent: lifted, easing: "ease-out" });
    });
    bindings.set(element, () => off.forEach((remove) => remove()));
  }

  function discoverRadar() {
    for (const anchor of page.querySelectorAll(".radar-wrapper")) {
      let group = idleGroups.get(anchor);
      if (!group) {
        group = { visible: false, animations: new Map() };
        idleGroups.set(anchor, group);
        idleObserver.observe(anchor);
      }
      // ResponsiveContainer can insert the SVG after the initial React commit.
      // Only pulse the colored area; data, geometry, grid and labels stay intact.
      for (const area of anchor.querySelectorAll(".recharts-radar-polygon .recharts-polygon")) {
        if (group.animations.has(area)) continue;
        const base = Number.parseFloat(view.getComputedStyle(area).fillOpacity);
        if (!Number.isFinite(base) || base <= 0) continue;
        const pulse = run(area, [
          { fillOpacity: base },
          { fillOpacity: Math.min(1, base + MOTION.radarPulseAmount) },
          { fillOpacity: base },
          { fillOpacity: Math.max(0, base - MOTION.radarPulseAmount) },
          { fillOpacity: base },
        ], {
          lane: "idle", duration: MOTION.radarPulseDuration,
          iterations: Infinity, easing: "ease-in-out",
        });
        if (pulse) {
          pulse.pause();
          pulse.currentTime = 0;
          group.animations.set(area, pulse);
        }
      }
    }
    syncIdle();
  }

  function watchExperience(card) {
    if (card === watchedCard) return;
    cardObserver?.disconnect();
    watchedCard = card;
    if (!card) return;
    let previousText = card.textContent;
    cardObserver = new view.MutationObserver(() => {
      const nextText = card.textContent;
      if (nextText === previousText) return;
      previousText = nextText;
      if (!isOnScreen(card) || doc.hidden || !reveals.get(card)?.settled) return;
      // Fade/settle updated content, not the image, frame or entire page. React keeps
      // the same nodes and focus. Fast hovering cancels the previous animation.
      [card.children[0], card.children[2], card.children[3]].forEach((part, index) => {
        if (!part || part.contains(doc.activeElement)) return;
        run(part, [
          { opacity: 0.2, translate: `0px ${MOTION.contentDistance}px` },
          { opacity: 1, translate: "0px 0px" },
        ], { lane: "content", duration: MOTION.contentDuration,
          delay: index * MOTION.contentStagger });
      });
    });
    cardObserver.observe(card, { childList: true, characterData: true, subtree: true });
  }

  function pruneRemovedElements() {
    for (const [element, record] of reveals) {
      if (element.isConnected) continue;
      revealObserver.unobserve(element);
      record.waiting?.cancel();
      record.animation?.cancel();
      reveals.delete(element);
    }
    for (const [element, remove] of bindings) {
      if (element.isConnected) continue;
      remove();
      bindings.delete(element);
    }
    for (const [anchor, group] of idleGroups) {
      if (anchor.isConnected) continue;
      idleObserver.unobserve(anchor);
      group.animations.forEach((animation) => animation.cancel());
      idleGroups.delete(anchor);
    }
  }

  function scan() {
    if (disposed) return;
    pruneRemovedElements();
    const targets = collectMotionTargets(page);
    for (const record of targets.reveals) {
      if (reveals.has(record.element)) continue;
      const state = { ...record, played: false, settled: false, waiting: null };
      reveals.set(record.element, state);
      if (doc.hidden || record.element.contains(doc.activeElement)) {
        state.played = true;
        state.settled = true;
        continue;
      }
      // Hold only opacity until the scroll reveal starts. This avoids visible
      // content flashing off and back on as it crosses the reveal threshold.
      state.waiting = run(record.element, [{ opacity: 0 }, { opacity: 0 }], {
        lane: "waiting", duration: 1, persistent: true,
      });
      if (state.waiting) {
        state.waiting.pause();
        state.waiting.currentTime = 0;
      }
      revealObserver.observe(record.element);
    }
    targets.interactions.forEach(bindInteraction);
    watchExperience(targets.experienceCard);
    discoverRadar();
  }

  // Only rescan for added/removed ELEMENTS, not every typed letter, style change
  // or radar frame. This avoids coupling animation to React re-renders/scroll.
  const structureObserver = new view.MutationObserver((records) => {
    const changed = records.some((record) =>
      [...record.addedNodes, ...record.removedNodes].some((node) => node.nodeType === 1),
    );
    if (!changed || scanQueued || disposed) return;
    scanQueued = true;
    view.queueMicrotask(() => { scanQueued = false; scan(); });
  });

  const onFocus = (event) => settleAncestors(event.target);
  const onVisibility = () => {
    if (doc.hidden) {
      for (const record of reveals.values()) {
        if (record.played && !record.settled) {
          record.settled = true;
          record.animation?.cancel();
        }
      }
    }
    syncIdle();
  };
  const onBeforePrint = () => {
    for (const [element, record] of reveals) {
      record.played = true;
      record.settled = true;
      revealObserver.unobserve(element);
      record.waiting?.cancel();
      record.waiting = null;
      record.animation?.cancel();
    }
  };
  page.addEventListener("focusin", onFocus);
  doc.addEventListener("visibilitychange", onVisibility);
  view.addEventListener("beforeprint", onBeforePrint);
  structureObserver.observe(page, { childList: true, subtree: true });
  scan();

  return () => {
    // Safe for React StrictMode, route changes, reduced-motion toggles and HMR.
    disposed = true;
    revealObserver.disconnect();
    idleObserver.disconnect();
    structureObserver.disconnect();
    cardObserver?.disconnect();
    page.removeEventListener("focusin", onFocus);
    doc.removeEventListener("visibilitychange", onVisibility);
    view.removeEventListener("beforeprint", onBeforePrint);
    bindings.forEach((remove) => remove());
    animations.forEach((animation) => animation.cancel());
    animations.clear();
    bindings.clear();
    reveals.clear();
    idleGroups.clear();
  };
}
