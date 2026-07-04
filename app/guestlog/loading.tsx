// Mirrors CommentList's layout so the resolved page doesn't shift.
import { siteConfig } from "@/lib/config";

export default function Loading() {
  return (
    <section className="space-y-4 p-4" aria-busy="true" aria-label="Loading comments">
      <h2 className="text-lg font-bold mb-4">
        {siteConfig.guestbook.commentsHeading}
      </h2>
      <ul className="space-y-4 motion-safe:animate-pulse">
        {[0, 1, 2].map((i) => (
          <li key={i} className="flex items-start space-x-3 p-2">
            <div className="w-10 h-10 rounded-full bg-muted shrink-0" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-3 w-32 rounded bg-muted" />
              <div className="h-3 w-3/4 rounded bg-muted" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
