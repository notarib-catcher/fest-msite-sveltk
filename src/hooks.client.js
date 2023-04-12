import * as SentrySvelte from '@sentry/svelte';
import { BrowserTracing } from '@sentry/tracing';

SentrySvelte.init({
  dsn: '__DSN__',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

SentrySvelte.setTag('svelteKit', 'browser');

// This will catch errors in load functions from +page.ts files
// @ts-ignore
export const handleError = (({ error, event }) => {
  SentrySvelte.captureException(error, { contexts: { sveltekit: { event } } });

  return {
    // @ts-ignore
    message: error.message
  };
})