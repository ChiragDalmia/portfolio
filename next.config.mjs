import createMDX from "@next/mdx";

const isDev = process.env.NODE_ENV === "development";

// script-src needs 'unsafe-inline' because the theme script in app/layout.tsx
// and Next's bootstrap scripts are inline; a nonce-based policy would require
// middleware and force the static pages dynamic. 'unsafe-eval' and ws: are
// dev-only (React Refresh / HMR). va.vercel-scripts.com serves the Vercel
// Analytics debug script; the production script and beacon are same-origin.
// form-action allows github.com so the OAuth redirect after the sign-in POST
// isn't blocked by browsers that check redirects against form-action.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://avatars.githubusercontent.com",
  "font-src 'self' data:",
  `connect-src 'self' https://va.vercel-scripts.com${isDev ? " ws:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://github.com",
  "frame-ancestors 'none'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
