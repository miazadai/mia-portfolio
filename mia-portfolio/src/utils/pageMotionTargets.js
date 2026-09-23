/**
 * Faster, more noticeable motion — revision of the supplied motion update.
 * Only motion settings / selectors live here. No design or content changes.
 *
 * All pages are enabled. To preview Home only, use ["home"] below.
 * Home selectors retain the exact structure used by the original motion layer.
 */
export const ENABLED_MOTION_PAGES = [
  "home", "resume", "projects", "projectDetail", "about", "contact",
];

export const MOTION = Object.freeze({
  titleDistance: 40,
  textDistance: 24,
  cardDistance: 40,
  titleDuration: 300,
  revealDuration: 280,
  popDuration: 300,
  nodeDuration: 260,
  stagger: 35,
  maximumDelay: 120,
  entranceEasing: "cubic-bezier(0.2, 0.7, 0.3, 1)",
  revealThreshold: 0.15,
  popStartScale: 0.92,
  popOvershootScale: 1.018,
  nodeStartScale: 0.68,
  nodeOvershootScale: 1.08,
  settlePixels: 3,
  hoverLift: 6,
  hoverDuration: 110,
  pressDistance: 3,
  pressDuration: 120,
  swayDegrees: 4,
  swayDuration: 450,
  contentDistance: 12,
  contentDuration: 180,
  contentStagger: 15,
  // The radar remains gentler than the entrances: no rotating values or labels.
  radarFloatPixels: 4,
  radarFloatDuration: 4200,
  radarPulseDuration: 2800,
  radarPulseAmount: 0.10,
});

export function getPageKind(page) {
  if (page.querySelector(".home-page-banner")) return "home";
  if (page.matches(".project-detail-page")) return "projectDetail";
  if (page.matches(".projects-page")) return "projects";
  if (page.matches(".resume-page")) return "resume";
  if (page.matches(".about-page")) return "about";
  if (page.matches(".contact-page")) return "contact";
  return null;
}

export function collectMotionTargets(page) {
  const reveals = [];
  const interactions = [];
  const kind = getPageKind(page);
  const all = (selector, root = page) => [...root.querySelectorAll(selector)];
  const add = (selector, options = {}, root = page) => {
    all(selector, root).forEach((element, index) => {
      reveals.push({
        element,
        type: "rise",
        distance: MOTION.textDistance,
        ...options,
        delay: Math.min(
          MOTION.maximumDelay,
          (options.delay || 0) + (index % 4) * (options.stagger || 0),
        ),
      });
    });
  };
  const interact = (selector, options = {}, root = page) => {
    all(selector, root).forEach((element) => {
      interactions.push({ element, ...options });
    });
  };
  const title = (selector, options = {}) => add(selector, {
    type: "title",
    distance: MOTION.titleDistance,
    duration: MOTION.titleDuration,
    ...options,
  });

  let experienceCard = null;

  if (kind === "home") {
    title(".home-page-banner-title");
    title(".home-page-banner-subtitle", { distance: 28, delay: 45 });

    const sections = all(":scope > section");
    const intro = sections[1];
    const story = sections[2];
    const quests = sections[3];

    if (intro) {
      add(":scope > div > div:first-child", { delay: 65 }, intro);
      add("p", { delay: 90, stagger: MOTION.stagger }, intro);
    }
    if (story) {
      const heading = story.children[0];
      if (heading) {
        add(":scope > div:first-child", { type: "title", distance: 32 }, heading);
        add(":scope > div:nth-child(2)", { delay: 30 }, heading);
        add(":scope > p", { delay: 60 }, heading);
        add("[aria-label='Timeline category legend'] > div", {
          type: "pop", distance: 12, delay: 70, stagger: 20,
        }, heading);
      }
      // Preserve the timeline's centering, branches, scrolling and hover growth.
      const timeline = story.children[1];
      if (timeline) {
        add("button", { type: "fade", duration: 220, stagger: 25 }, timeline);
        add("button > div:nth-child(2)", {
          type: "node", stagger: 25, duration: MOTION.nodeDuration,
        }, timeline);
      }
      experienceCard = story.querySelector("article");
      if (experienceCard) {
        reveals.push({
          element: experienceCard, type: "pop", distance: MOTION.cardDistance,
          duration: MOTION.popDuration, delay: 20,
        });
        interact("button", { hover: "lift", press: true }, experienceCard);
      }
    }
    if (quests) {
      add(":scope > div > div:first-child", { type: "title", distance: 32 }, quests);
      add(":scope > div > p", { delay: 30 }, quests);
      add("[role='button']", {
        type: "pop", distance: MOTION.cardDistance, stagger: MOTION.stagger,
      }, quests);
      // Existing React hover/expand effects are preserved, not doubled.
      add("[role='button'] > div:nth-child(2)", {
        distance: 16, duration: 180,
      }, quests);
      interact("[role='button']", { press: true }, quests);
    }
  }

  if (kind === "resume") {
    title(".resume-title", { distance: -32 });
    add(".resume-download-section", { delay: 50 });
    add(".resume-document-wrapper", { distance: 32, delay: 80 });
    add(".resume-character-circle", { type: "pop", delay: 85 });
    // Do not move the speech bubble or interfere with its typewriter loop.
    add(".achievements-header-box, .achievements-block-heading", {
      type: "title", distance: 32,
    });
    add(".achievement-badge-card", {
      type: "pop", distance: 32, stagger: MOTION.stagger,
    });
    add(".achievement-skill-card", { distance: 32, stagger: MOTION.stagger });
    add(".achievements-progress");
    interact(".achievement-badge-card", {
      hover: "sway", target: ".achievement-medal-image",
    });
    interact(".resume-download-button, .resume-expand-button", { press: true });
  }

  if (kind === "projects") {
    title(".projects-banner h1");
    add(".project-deck-heading", { type: "title", distance: 32, delay: 40 });
    add(".project-card", { distance: MOTION.cardDistance, stagger: MOTION.stagger });
    // Keep a distinct pop for the glove's existing core card.
    for (const record of reveals) {
      if (record.element.matches(".project-card") && record.element.querySelector(
        "a[href*='project=exoskeletal-hand-brace']",
      )) record.type = "pop";
    }
    add(".project-card-mini-loadout > span", { distance: 12, delay: 90, stagger: 15 });
    interact(".project-card", { hover: "lift", target: ".project-cover-media" });
    interact(".project-card-cta, .project-deck-buttons button", { press: true });
  }

  if (kind === "projectDetail") {
    add(".project-back-button", { type: "fade" });
    add(".project-detail-kicker", { delay: 25 });
    title(".project-detail-hero h1", { delay: 50 });
    add(".project-detail-meta", { delay: 80 });
    add(".project-detail-intro", { delay: 110 });
    add(".project-carousel, .locked-media-panel, .project-empty-media", { distance: 36 });
    add(".project-copy-heading, .project-copy-section > p", { stagger: 25 });
    add(".project-stats-panel, .project-loadout, .project-achievement, .project-next-level", {
      distance: 32, stagger: MOTION.stagger,
    });
    interact(".project-back-button, .project-external-link, .project-carousel-arrow", {
      press: true,
    });
  }

  if (kind === "about") {
    add(".about-banner-kicker");
    title(".about-banner h1", { delay: 35 });
    add(".about-banner-subtitle", { delay: 75 });
    add(".about-headshot-frame", { type: "pop", distance: 32, delay: 85 });
    add(".about-copy > *", { delay: 80, stagger: 20 });
    add(".character-class-card", { type: "pop", distance: 32 });
    add(".section-heading > *", { stagger: 30 });
    add(".radar-wrapper", { distance: 32 });
    add(".skill-panel", { distance: 36, stagger: MOTION.stagger });
    add(".special-move-card", {
      type: "pop", distance: 36, stagger: MOTION.stagger,
    });
    interact(".special-move-card", { hover: "sway", target: ".move-number" });
  }

  if (kind === "contact") {
    // Keep the nested typing / SEND / cursor loop and form placement intact.
    title(".contact-title-stage");
    add(".contact-envelope", { distance: 24, delay: 50 });
    add(".contact-paper", { distance: 36, delay: 95 });
    // Only the existing Contact logic can mount the status / success box.
    add(".contact-success-box", { type: "pop", distance: 20, duration: 240 });
    interact(".contact-form-submit", { press: true });
  }

  return { kind, reveals, interactions, experienceCard };
}
