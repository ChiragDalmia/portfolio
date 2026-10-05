import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { pageMetadata, person, personId, website, websiteId } from "@/lib/seo";

import JsonLd from "@/components/JsonLd";
import ProjectList from "@/components/ProjectList";
import ExperienceList from "@/components/ExperienceList";
import RichText from "@/components/RichText";
import Section from "@/components/Section";

export const metadata = pageMetadata({
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  path: "/",
});

const {
  intro,
  personalHeading,
  hackathonHeading,
  allProjectsLabel,
  experienceHeading,
  experience,
} = siteConfig.home;

const Page = () => {
  return (
    <>
      {/* ProfilePage → Person so search engines can tell this Chirag Dalmia
          apart from others with the same name (role, employer, profiles). */}
      <JsonLd
        graph={[
          website,
          {
            "@type": "ProfilePage",
            "@id": `${siteConfig.site.url}/#profilepage`,
            url: siteConfig.site.url,
            name: siteConfig.seo.title,
            isPartOf: { "@id": websiteId },
            mainEntity: { "@id": personId },
          },
          person,
        ]}
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
        <p className="mt-4 mb-0 text-sm">
          <Link href="/projects">{allProjectsLabel}</Link>
        </p>
      </Section>

      <Section title={experienceHeading}>
        <ExperienceList items={experience} />
      </Section>
    </>
  );
};

export default Page;
