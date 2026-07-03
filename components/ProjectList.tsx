import Link from "next/link";
import type { Project } from "@/lib/projects";
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

function ProjectEntry({ name, url, githubUrl, description }: Project) {
  const showSource = githubUrl && githubUrl !== url;
  return (
    <li className="ml-0 group">
      <Link href={url}>{name.replace("✨", "")}</Link>
      {description && <> - {description}</>}
      {showSource && (
        <>
          {" "}
          <Link
            href={githubUrl}
            className="text-xs text-muted-foreground whitespace-nowrap"
          >
            (Github)
          </Link>
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
