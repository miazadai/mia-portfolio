import { useSearchParams } from "react-router";

import ProjectDeck from "../components/ProjectDeck";
import ProjectDetailPreview from "../components/ProjectDetailPreview";

import {
  allProjects,
  coreProjects,
  fieldExperience,
} from "../data/projectData";

import "../projects.css";

function Projects() {
  const [searchParams] = useSearchParams();

  const selectedSlug =
    searchParams.get("project");

  const selectedProject =
    allProjects.find(
      (project) =>
        project.slug === selectedSlug
    );

  if (selectedProject) {
    return (
      <ProjectDetailPreview
        project={selectedProject}
      />
    );
  }

  return (
    <main className="projects-page">
      <section
        className="projects-hero"
        aria-label="Projects banner"
      >
        <div className="projects-hero-overlay" />

        <h1>
          PROJECTS
        </h1>
      </section>

      <div className="projects-content">
        <ProjectDeck
          eyebrow="COLLECTION 01"
          title="CORE PROJECTS"
          projects={coreProjects}
        />

        <ProjectDeck
          eyebrow="COLLECTION 02"
          title="FIELD EXPERIENCE"
          projects={fieldExperience}
        />
      </div>
    </main>
  );
}

export default Projects;