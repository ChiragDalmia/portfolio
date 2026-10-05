import Link from "next/link";
import type { Project } from "@/lib/config";
import LikeButton from "@/components/LikeButton";

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="space-y-1">
      {projects.map((project) => (
        <ProjectEntry key={project.name} {...project} />
      ))}
    </ul>
  );
}

const external = { target: "_blank", rel: "noopener noreferrer" } as const;
const muted = "text-xs text-muted-foreground whitespace-nowrap";

function ProjectEntry({ name, url, githubUrl, description, caseStudy }: Project) {
  const showSource = githubUrl && githubUrl !== url;
  return (
    <li className="ml-0 group">
      {/* With a case study the name links to it, and the live demo moves to
          its own small link; otherwise the name links straight to the demo. */}
      {caseStudy ? (
        <Link href={`/projects/${caseStudy}`}>{name}</Link>
      ) : (
        <a href={url} {...external}>
          {name}
        </a>
      )}
      {description && <> - {description}</>}
      {caseStudy && url !== githubUrl && (
        <>
          {" "}
          <a href={url} {...external} className={muted}>
            (Live)
          </a>
        </>
      )}
      {(showSource || (caseStudy && githubUrl)) && (
        <>
          {" "}
          <a href={githubUrl} {...external} className={muted}>
            (Github)
          </a>
        </>
      )}
      {/* Hidden until hover on pointer devices, but always visible once
          liked, when keyboard-focused, and on touch screens (no hover). */}
      <LikeButton
        slug={`project:${name}`}
        className="ml-2 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 aria-pressed:opacity-100 pointer-coarse:opacity-100"
      />
    </li>
  );
}
