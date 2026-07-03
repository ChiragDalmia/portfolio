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
        <p>
          I am a Full Stack dev crafting{" "}
          <Link href="/projects">cool web stuff</Link>. I love{" "}
          <Link href="/yaps/spline-projects">chatting about code</Link> and
          playing with 3D Design. Drop by my{" "}
          <Link href="/guestlog">digital guestbook</Link> and say hi!
        </p>
      </section>

      <p>
        Got a fun project? Let&apos;s team up! Find me on{" "}
        <Link href="https://x.com/dotchirag">Twitter</Link> for tech talk and
        memes.
      </p>

      <section aria-labelledby="projects">
        <h2 id="projects">Cool Stuff I Built</h2>
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
