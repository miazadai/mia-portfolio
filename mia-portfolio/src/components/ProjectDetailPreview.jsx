import {
  ArrowLeft,
  Construction,
} from "lucide-react";

import { Link } from "react-router";

function ProjectDetailPreview({
  project,
}) {
  return (
    <main className="project-detail-preview-page">
      <section
        className="project-detail-preview-hero"
        style={{
          "--detail-accent": project.accent,
          "--detail-accent-soft":
            project.accentSoft,
        }}
      >
        <div className="project-detail-preview-inner">
          <Link
            className="project-back-link"
            to="/projects"
          >
            <ArrowLeft
              size={18}
              strokeWidth={2.4}
            />
            BACK TO PROJECTS
          </Link>

          <span className="project-detail-type">
            {project.type}
          </span>

          <h1>
            {project.title}
          </h1>

          <p className="project-detail-org">
            {project.organization}
          </p>

          <p className="project-detail-summary">
            {project.summary}
          </p>

          <div className="project-detail-meta">
            <div>
              <span>ROLE</span>
              <strong>
                {project.role}
              </strong>
            </div>

            <div>
              <span>TIME</span>
              <strong>
                {project.period}
              </strong>
            </div>
          </div>

          <div className="project-detail-coming-soon">
            <Construction
              size={22}
              strokeWidth={2.2}
            />

            <div>
              <strong>
                CASE STUDY PAGE READY FOR
                THE NEXT BUILD
              </strong>

              <p>
                This button is live now.
                Next, this space will become
                the full overview, what I did,
                tools and skills, outcome,
                and image gallery.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProjectDetailPreview;