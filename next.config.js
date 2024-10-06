/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { withSentryConfig } from "@sentry/nextjs";
import "./src/env.js"; // Dynamic import of env.js

/** @type {import("next").NextConfig} */
const config = {};

// Sentry configuration, now using ES module syntax
const sentryConfig = withSentryConfig(config, {
	// For all available options, see:
	// https://github.com/getsentry/sentry-webpack-plugin#options

	org: "demari",
	project: "options-trader",

	// Only print logs for uploading source maps in CI
	silent: !process.env.CI,

	// For all available options, see:
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

	// Upload a larger set of source maps for prettier stack traces (increases build time)
	widenClientFileUpload: true,

	// Automatically annotate React components to show their full name in breadcrumbs and session replay
	reactComponentAnnotation: {
		enabled: true,
	},

	// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers
	tunnelRoute: "/monitoring",

	// Hides source maps from generated client bundles
	hideSourceMaps: true,

	// Automatically tree-shake Sentry logger statements to reduce bundle size
	disableLogger: true,

	// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
	automaticVercelMonitors: true,
});

// Export the final config object using ES module syntax
export default sentryConfig;
