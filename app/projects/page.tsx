import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

import ProjectList from "@/components/ProjectList";
import RichText from "@/components/RichText";
import Section from "@/components/Section";

const { metaTitle, metaDescription, heading, intro, personalHeading, hackathonHeading } =
  siteConfig.projectsPage;

export const metadata = pageMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <section aria-labelledby="projects">
        <h1 id="projects" className="mt-0">
          {heading}
        </h1>
        <p>
          <RichText content={intro} />
        </p>
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
