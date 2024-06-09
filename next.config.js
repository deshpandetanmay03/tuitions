/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const coreConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

import { withSentryConfig } from "@sentry/nextjs";

const config = withSentryConfig(
    coreConfig,
    {
        org: "tanmaydeshpande",
        project: "tuitions",
        silent: !process.env.CI,
        widenClientFileUpload: true,
        hideSourceMaps: true,
        disableLogger: true,
        automaticVercelMonitors: true,
        tunnelRoute: "/sentry",
    }
);

export default config;
