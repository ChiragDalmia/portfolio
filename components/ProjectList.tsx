import Link from "next/link";
import type { Project } from "@/lib/projects";

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
    <li className="ml-0">
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
    </li>
  );
}
