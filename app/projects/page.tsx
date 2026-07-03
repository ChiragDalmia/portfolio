import { personalProjects, hackathonProjects } from "@/lib/projects";
import type { Metadata } from "next";

import ProjectList from "@/components/ProjectList";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <>
      <section aria-labelledby="projects">
        <h1 id="projects" className="mt-0">
          Projects
        </h1>
      </section>

      <Section title="Personal Projects">
        <ProjectList projects={personalProjects} />
      </Section>

      <Section title="Hackathon Projects">
        <ProjectList projects={hackathonProjects} />
      </Section>
    </>
  );
}
