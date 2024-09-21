import { createRequire } from "module";
const require = createRequire(import.meta.url);

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withBundleAnalyzer(nextConfig);
