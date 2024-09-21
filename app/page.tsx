import { Metadata } from "next";
import { siteConfig } from "@/config/metadata";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <header className="pt-16">
        <h1 className="text-4xl font-bold">{siteConfig.name}</h1>
        <p className="mt-2 text-xl">{siteConfig.description}</p>
      </header>
    </main>
  );
}
