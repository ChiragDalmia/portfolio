import Link from "next/link";
import type { ExperienceItem } from "@/lib/config";

export default function ExperienceList({ items }: { items: ExperienceItem[] }) {
  return (
    <ul className="space-y-3">
      {items.map((experience) => (
        <ExperienceEntry key={experience.linkText} {...experience} />
      ))}
    </ul>
  );
}

function ExperienceEntry({
  dateRange,
  prefix,
  linkText,
  suffix,
  url,
  description,
}: ExperienceItem) {
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
