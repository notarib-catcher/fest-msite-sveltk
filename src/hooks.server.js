import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/core/providers/google"

// import * as SentryNode from '@sentry/node';
// import '@sentry/tracing';
import * as dotenv from 'dotenv' 
dotenv.config()

// SentryNode.init({
//     dsn: process.env.SENTRY_DSN,
//     tracesSampleRate: 1.0,
//     // Add the Http integration for tracing
//     integrations: [new SentryNode.Integrations.Http()]
// });
  
// SentryNode.setTag('svelteKit', 'server');


export const handle = SvelteKitAuth({
    //@ts-ignore
    providers:[ Google({
        //@ts-ignore
        clientId: "478459070159-1smgvbs62bo8knj3c2o6v1c8743binnq.apps.googleusercontent.com",
        //@ts-ignore
        clientSecret: "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",
        //@ts-ignore
        })], 

    secret: "vaibhav sharma",
    trustHost: true
})

// @ts-ignore
