import React from "react";
import { projectsData } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {projectsData.map((project, index) => (
        <ProjectCard key={index} project={project} index={index} />
      ))}
    </div>
  );
}

interface ProjectCardProps {
  project: {
    name: string;
    url: string;
    description: string;
  };
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const isFeatured = project.name.includes("✨");

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <article
        className={`
          relative h-full bg-card/70 backdrop-blur-sm border border-border/50
          rounded-2xl p-6 transition-all duration-500 ease-out
          hover:bg-card hover:border-border hover:shadow-xl hover:shadow-border/20
          hover:-translate-y-2 hover:scale-[1.02]
          ${
            isFeatured
              ? "ring-1 ring-amber-200/50 bg-gradient-to-br from-amber-50/30 dark:from-amber-950/20 to-card/70"
              : ""
          }
        `}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xs">✨</span>
          </div>
        )}

        {/* Image Placeholder - Optimized for future image integration */}
        <div className="w-full h-48 bg-gradient-to-br from-muted to-muted/60 rounded-xl mb-6 overflow-hidden relative group-hover:shadow-inner transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-card/80 rounded-full flex items-center justify-center shadow-sm">
              <div className="w-8 h-8 bg-gradient-to-br from-muted-foreground/40 to-muted-foreground/60 rounded-lg opacity-60" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-foreground/80 transition-colors duration-200 line-clamp-1">
            {project.name.replace("✨", "")}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 group-hover:text-foreground/70 transition-colors duration-200">
            {project.description}
          </p>
        </div>

        {/* Hover Indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-4 h-4 text-background"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </div>

        {/* Subtle Border Gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-gray-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </article>
    </a>
  );
}
