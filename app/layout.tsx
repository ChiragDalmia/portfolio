import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "My Portfolio",
    template: "%s | My Portfolio",
  },
  description: "A showcase of my work and skills as a web developer",
  keywords: ["portfolio", "web development", "react", "next.js"],
  authors: [{ name: "Chirag Dalmia" }],
  creator: "Chirag Dalmia",
  publisher: "Chirag Dalmia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://portfolio-zeta-ten-70.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "My Portfolio",
    description: "A showcase of my work and skills as a web developer",
    url: "https://portfolio-zeta-ten-70.vercel.app/",
    siteName: "My Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Portfolio",
    description: "A showcase of my work and skills as a web developer",
    creator: "@chiragdalmia007",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}