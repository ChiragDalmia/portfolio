import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
  experimental: {
    mdxRs: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
