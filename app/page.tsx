import { projectsData } from "@/lib/projects";
import Link from "next/link";
import React from "react";



const Page = () => {
  return (
    <>
      <h1>Hey, I&apos;m Chirag.</h1>
      <section aria-labelledby="about-me">
        <h2 id="about-me" className="sr-only">
          About Me
        </h2>
        <ul>
          <li>
            I am a front end developer. I love making{" "}
            <Link href="/projects">cool web stuff</Link> and yapping about{" "}
            <Link href="/yap-corner">the process</Link>. Specializing in 3D,
            clean UI, and interactive designs. Share your thoughts{" "}
            <Link href="/guestlog">in my guestlog</Link>.
          </li>
        </ul>
      </section>

      <p>
        I&apos;m open to new opportunities &ndash; let&apos;s chat on{" "}
        <Link href="https://x.com/dotchirag">Twitter</Link>.
      </p>

      <section aria-labelledby="projects">
        <h2 id="projects">Projects</h2>
        <ul>
          {projectsData.map((project, index) => (
            <li key={index}>
              <Link href={project.url}>
                {project.name}
                <span className="sr-only">
                  {project.description ? ` – ${project.description}` : ""}
                </span>
              </Link>
              {project.description && (
                <span aria-hidden="true"> – {project.description}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Page;
