// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://1b4b1288649c528b2ca102416c2de69a@o4509201155358720.ingest.us.sentry.io/4509201160011776",
  integrations: [Sentry.mongooseIntegration()],
});