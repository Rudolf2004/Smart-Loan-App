# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Smart Loan App

## Local development

Run both the Vite client and the API from the repository root:

```bash
npm run dev
```

The client runs at `http://localhost:5173` and the API at `http://localhost:8000`. Use `npm run dev:web` or `npm run dev:api` when only one service is needed.

## Administration

The administrator portal is available at `/admin`. Add one or more existing account email addresses to `server/.env` before starting the app:

```env
ADMIN_EMAILS=admin@example.com,manager@example.com
```

Those accounts are redirected to the administrator portal after login. Administrators can view live totals, review every submitted application, record a human decision and note, request more information, manage user roles, and suspend or reactivate accounts. The ML recommendation remains advisory; the administrator action is stored as the human decision.

## AI loan guide

The app supports nine interface and assistant languages: English, Twi, French, Hausa, Ga, Ewe, Spanish, Portuguese, and Arabic. Selecting a language updates the full static interface, speech recognition, spoken responses, and document language; Arabic also enables right-to-left layout.

Authenticated loan forms include a conversational voice guide. It asks for one field at a time, listens for the answer, fills the field, reads the captured answer back, and then moves to the next question. The separate educational AI guide can explain forms, documents, and lending concepts, but it is deliberately isolated from the eligibility engine and cannot approve or deny a loan.

Configure the backend only (never the Vite client) with:

```env
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-5.6-terra
```

The model name is configurable so deployments can pin an approved model. Requests are authenticated, length-limited, rate-limited, not stored by the Responses API request, and prompted not to collect sensitive credentials or use protected characteristics. A human reviewer must own regulated lending decisions.
