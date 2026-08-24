import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

import { publicPath } from "../utils/publicPath";

function ProjectCard({ project, index }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className="project-card"
      style={{
        "--card-accent": project.accent,
        "--card-accent-soft": project.accentSoft,
        "--card-tilt": project.tilt,
      }}
    >
      <div className="project-card-inner">

        <div className="project-card-kicker-row">
          <span className="project-card-number">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="project-card-type">
            {project.type}
          </span>
        </div>


        <div className="project-card-title-block">
          <h3>
            {project.title}
          </h3>

          <p>
            {project.organization}
          </p>
        </div>


        <div className="project-card-image-frame">

          <div className="project-card-image-fallback">
            <span>
              {project.imageLabel}
            </span>

            <small>
              ADD PROJECT IMAGE
            </small>
          </div>

          {project.image && !imageError && (
            <img
              src={publicPath(project.image)}
              alt={`${project.title} project`}
              onError={() =>
                setImageError(true)
              }
            />
          )}

        </div>


        <div className="project-card-stats">

          <div>
            <span>
              ROLE
            </span>

            <strong>
              {project.role}
            </strong>
          </div>

          <div>
            <span>
              TIME
            </span>

            <strong>
              {project.period}
            </strong>
          </div>

        </div>


        <p className="project-card-summary">
          {project.summary}
        </p>


        <div
          className="project-card-skills"
          aria-label="Project skills"
        >
          {project.skills.map((skill) => (
            <span key={skill}>
              {skill}
            </span>
          ))}
        </div>


        <Link
          className="project-card-button"
          to={`/projects?project=${project.slug}`}
          aria-label={`View ${project.title}`}
        >
          VIEW PROJECT

          <ArrowUpRight
            size={17}
            strokeWidth={2.4}
          />
        </Link>

      </div>
    </article>
  );
}

export default ProjectCard;