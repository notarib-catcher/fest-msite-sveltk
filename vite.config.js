import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
	optimizeDeps: {
		include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
	  },
	build: {
		sourcemap: true, // Source map generation must be turned on
	  },
	plugins: [sveltekit(),
		sentryVitePlugin({
			org: "maheblr",
			project: "javascript-svelte",
	  
			// Specify the directory containing build artifacts
			include: "./dist",
	  
			// Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
			// and need `project:releases` and `org:read` scopes
			authToken: process.env.SENTRY_AUTH_TOKEN,
	  
			// Optionally uncomment the line below to override automatic release name detection
			// release: process.env.RELEASE,
		  }),]
});
