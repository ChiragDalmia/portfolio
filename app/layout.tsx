// layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { metadataConfig, siteConfig } from "@/config/metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata = metadataConfig;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={siteConfig.url} />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
