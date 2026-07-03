import React from "react";

export default function Section({
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
