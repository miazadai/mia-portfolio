import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import ProjectCard from "./ProjectCard";

function ProjectDeck({
  title,
  eyebrow,
  projects,
}) {
  const trackRef = useRef(null);

  const headingId =
    `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-heading`;

  const scrollDeck = (direction) => {
    if (!trackRef.current) return;

    const amount = Math.max(
      280,
      trackRef.current.clientWidth * 0.55
    );

    trackRef.current.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="project-section"
      aria-labelledby={headingId}
    >
      <div className="project-section-topline">
        <div className="project-section-title-box">
          <span>{eyebrow}</span>
          <h2 id={headingId}>
            {title}
          </h2>
        </div>

        <div
          className="project-deck-controls"
          aria-label={`${title} controls`}
        >
          <button
            type="button"
            onClick={() => scrollDeck(-1)}
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft
              size={22}
              strokeWidth={2.5}
            />
          </button>

          <button
            type="button"
            onClick={() => scrollDeck(1)}
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight
              size={22}
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>

      <div
        className="project-card-track"
        ref={trackRef}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

export default ProjectDeck;