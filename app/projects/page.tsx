import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

import ProjectList from "@/components/ProjectList";
import Section from "@/components/Section";

const { metaTitle, metaDescription, heading, personalHeading, hackathonHeading } =
  siteConfig.projectsPage;

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <section aria-labelledby="projects">
        <h1 id="projects" className="mt-0">
          {heading}
        </h1>
      </section>

      <Section title={personalHeading}>
        <ProjectList projects={siteConfig.projects.personal} />
      </Section>

      <Section title={hackathonHeading}>
        <ProjectList projects={siteConfig.projects.hackathon} />
      </Section>
    </>
  );
}
