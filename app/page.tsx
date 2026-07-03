import { personalProjects, hackathonProjects } from "@/lib/projects";
import Link from "next/link";
import React from "react";

const experienceData = [
  {
    dateRange: "Feb. 2025 - Mar. 2026",
    prefix: "Fullstack Dev at ",
    linkText: "Academy Petroleum Industries",
    suffix: "",
    url: "https://www.academypetroleum.com/",
    description:
      "Developing full stack solutions to streamline operations and internal tooling.",
  },
  {
    dateRange: "Sep. 2024 - Dec. 2024",
    prefix: "",
    linkText: "HackCanada",
    suffix: " Organiser (Front-end Dev)",
    url: "https://staging.hackcanada.org/",
    description:
      "Helped Organize one of Canada's largest student-run hackathons with designing website, logistics, and everything in between.",
  },
  {
    dateRange: "Mar. 2024 - Sep. 2024",
    prefix: "Web Dev Intern at ",
    linkText: "Sheridan College",
    suffix: "",
    url: "https://www.sheridancollege.ca/",
    description:
      "Building and maintaining web experiences for the college community.",
  },
];

const Page = () => {
  return (
    <>
      <section aria-labelledby="intro">
        <h1 id="intro" className="mt-0">
          Hey, I&apos;m Chirag.
        </h1>
        <p>
          I&apos;m a Full Stack Developer who loves building{" "}
          <Link href="/projects">cool web stuff</Link>. Lately, I&apos;ve been
          obsessed with learning how large-scale companies design their
          infra. I&apos;m always looking for opportunities to build, learn,
          and contribute to exciting projects.
        </p>
        <p>
          Got a fun project in mind? Let&apos;s team up. You can find me on{" "}
          <Link href="https://www.linkedin.com/in/chiragdalmia007">
            linkedin
          </Link>{" "}
          or drop a message in my <Link href="/guestlog">guestbook</Link>.
        </p>
      </section>

      <Section title="Personal Projects">
        <ul className="space-y-1">
          {personalProjects.map((project) => (
            <Entry key={project.name} {...project} />
          ))}
        </ul>
      </Section>

      <Section title="Some of My Fav Hackathon Projects">
        <ul className="space-y-1">
          {hackathonProjects.map((project) => (
            <Entry key={project.name} {...project} />
          ))}
        </ul>
      </Section>

      <Section title="Experience">
        <ul className="space-y-3">
          {experienceData.map((experience) => (
            <ExperienceEntry key={experience.linkText} {...experience} />
          ))}
        </ul>
      </Section>
    </>
  );
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <section aria-labelledby={id} className="pt-6">
      <h2 id={id} className="mt-0 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Entry({
  name,
  url,
  description,
}: {
  name: string;
  url: string;
  description?: string;
}) {
  return (
    <li className="ml-0">
      <Link href={url}>{name.replace("✨", "")}</Link>
      {description && <> - {description}</>}
    </li>
  );
}

function ExperienceEntry({
  dateRange,
  prefix,
  linkText,
  suffix,
  url,
  description,
}: {
  dateRange?: string;
  prefix?: string;
  linkText: string;
  suffix?: string;
  url?: string;
  description?: string;
}) {
  return (
    <li className="ml-0">
      <div className="flex items-baseline justify-between gap-4">
        <span>
          {prefix}
          {url ? <Link href={url}>{linkText}</Link> : linkText}
          {suffix}
        </span>
        {dateRange && (
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {dateRange}
          </span>
        )}
      </div>
      {description && <p className="mb-0">{description}</p>}
    </li>
  );
}

export default Page;
