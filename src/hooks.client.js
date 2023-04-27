// import * as SentrySvelte from '@sentry/svelte';
// import { BrowserTracing } from '@sentry/tracing';

// SentrySvelte.init({
//   dsn: 'https://79e7c19686934f2c93548b81a2898ab3@o4504999335886848.ingest.sentry.io/4504999386284032',
//   integrations: [new BrowserTracing()],
//   tracesSampleRate: 1.0,
// });

// SentrySvelte.setTag('svelteKit', 'browser');

// This will catch errors in load functions from +page.ts files
// @ts-ignore
// export const handleError = (({ error, event }) => {
//   SentrySvelte.captureException(error, { contexts: { sveltekit: { event } } });

//   return {
//     // @ts-ignore
//     message: error.message
//   };
// })