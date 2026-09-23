import { useLayoutEffect } from "react";
import { useLocation } from "react-router";
import { createPageMotion } from "../utils/pageMotion.js";

/**
 * One shared motion layer. It does not render a wrapper or change page state.
 * Page titles replay only when the pathname / selected project changes.
 * Existing timeline, form, typewriter, carousel and navbar logic stay intact.
 */
export default function usePageMotion(scopeRef) {
  const { pathname, search } = useLocation();
  const projectId = pathname === "/projects"
    ? new URLSearchParams(search).get("project") || ""
    : "";

  useLayoutEffect(() => {
    // Scope to the page, never the navbar or the entire document.
    const page = scopeRef.current?.querySelector("main");
    if (!page || typeof window.matchMedia !== "function") return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};

    const refreshPreference = () => {
      dispose();
      dispose = reducedMotion.matches ? () => {} : createPageMotion(page);
    };

    refreshPreference();
    reducedMotion.addEventListener("change", refreshPreference);

    return () => {
      reducedMotion.removeEventListener("change", refreshPreference);
      dispose();
    };
  }, [scopeRef, pathname, projectId]);
}
