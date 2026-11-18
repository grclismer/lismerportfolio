# React + Vite

## Contact form on Vercel

The contact form sends its fields to the Vercel serverless function in
`api/contact.js`. The function uses Nodemailer and Gmail SMTP; it does not run
inside the browser.

1. Enable 2-Step Verification on the Gmail account used to send messages, then
   create a Google App Password for mail.
2. In Vercel, open **Project Settings → Environment Variables** and add:
   - `GMAIL_USER` — the Gmail account used for SMTP.
   - `GMAIL_APP_PASSWORD` — the Google App Password (keep this private).
   - `CONTACT_TO_EMAIL` — the inbox that should receive contact messages.
3. Add the variables to Production (and Preview/Development if those deployments
   should send mail), then redeploy.

Never put an app password in React code, a `VITE_` variable, or a committed
`.env` file. `.env.example` only documents the variable names. To test Vercel
functions locally, use `npx vercel dev` after linking the project and pulling
its environment variables with the Vercel CLI.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
