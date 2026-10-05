import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { siteConfig } from "@/lib/config";
import { breadcrumbs, pageMetadata, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import RichText from "@/components/RichText";
import Section from "@/components/Section";

const { caseStudies, caseStudyPage } = siteConfig;
type Slug = keyof typeof caseStudies;

// Only slugs in the config exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug as Slug];
  if (!study) return {};
  return pageMetadata({
    title: `${study.metaTitle} | ${siteConfig.author.name}`,
    description: study.metaDescription,
    path: `/projects/${slug}`,
    type: "article",
    modifiedTime: study.updated,
  });
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies[slug as Slug];
  if (!study) notFound();
  const path = `/projects/${slug}`;
  const url = new URL(path, siteConfig.site.url).href;

  return (
    <article aria-labelledby="case-study">
      <JsonLd
        graph={[
          {
            "@type": "Article",
            "@id": `${url}#article`,
            headline: study.metaTitle,
            description: study.metaDescription,
            url,
            mainEntityOfPage: url,
            image: new URL("/opengraph-image.jpg", siteConfig.site.url).href,
            datePublished: study.published,
            dateModified: study.updated,
            author: personRef,
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: study.name, path },
          ]),
        ]}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link href="/projects">projects</Link> / {study.name}
      </nav>
      <h1 id="case-study" className="mt-2">
        {study.name}
      </h1>
      <p>{study.summary}</p>

      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm mb-4">
        {study.facts.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="m-0">{value}</dd>
          </div>
        ))}
      </dl>

      <ul className="flex flex-wrap gap-x-4 list-none p-0 text-sm">
        {study.links.map((link) => (
          <li key={link.href} className="m-0">
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.text}
            </a>
          </li>
        ))}
      </ul>

      {study.sections.map((section) => (
        <Section key={section.heading} title={section.heading}>
          {section.paragraphs?.map((paragraph, i) => (
            <p key={i}>
              <RichText content={paragraph} />
            </p>
          ))}
          {section.bullets && (
            <ul className="list-disc space-y-1">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </Section>
      ))}

      <Section title={caseStudyPage.stackHeading}>
        <p>{study.stack.join(" · ")}</p>
      </Section>

      <footer className="pt-6 text-sm flex justify-between gap-4">
        <Link href="/projects">{caseStudyPage.backLabel}</Link>
        <span className="text-muted-foreground">
          {caseStudyPage.updatedLabel}{" "}
          <time dateTime={study.updated}>{formatDate(study.updated)}</time>
        </span>
      </footer>
    </article>
  );
}
