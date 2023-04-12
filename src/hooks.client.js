import * as SentrySvelte from '@sentry/svelte';
import { BrowserTracing } from '@sentry/tracing';

SentrySvelte.init({
  dsn: 'https://123772cef35244dc9d44952c84d88c3a@o4504999335886848.ingest.sentry.io/4504999337852928',
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