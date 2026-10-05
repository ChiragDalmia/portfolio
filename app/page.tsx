import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

import ProjectList from "@/components/ProjectList";
import ExperienceList from "@/components/ExperienceList";
import RichText from "@/components/RichText";
import Section from "@/components/Section";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const { intro, personalHeading, hackathonHeading, experienceHeading, experience } =
  siteConfig.home;

// Person structured data so search engines can connect the name, role,
// employer and social profiles. "<" is escaped so the JSON can't close the tag.
const personJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author.name,
  jobTitle: siteConfig.author.role,
  url: siteConfig.site.url,
  worksFor: { "@type": "Organization", ...siteConfig.author.worksFor },
  sameAs: siteConfig.social.map((s) => s.url),
}).replace(/</g, "\\u003c");

const Page = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: personJsonLd }}
      />
      <section aria-labelledby="intro">
        <h1 id="intro" className="mt-0">
          {intro.heading}
        </h1>
        {intro.paragraphs.map((paragraph, i) => (
          <p key={i}>
            <RichText content={paragraph} />
          </p>
        ))}
      </section>

      <Section title={personalHeading}>
        <ProjectList projects={siteConfig.projects.personal} />
      </Section>

      <Section title={hackathonHeading}>
        <ProjectList projects={siteConfig.projects.hackathon} />
      </Section>

      <Section title={experienceHeading}>
        <ExperienceList items={experience} />
      </Section>
    </>
  );
};

export default Page;
