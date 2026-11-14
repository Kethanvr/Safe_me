# SaveMe

SaveMe is a React interface prototype for a personal-safety dashboard. It includes sign-in and sign-up routes, a protected dashboard, and interface sections for safety status, check-ins, emergency contacts, settings, and help resources.

The app uses Firebase Authentication and Firestore. The dashboard should be treated as a prototype UI; this repository does not establish that emergency dispatch, location monitoring, or other real-world safety services are available. Do not rely on it in an emergency.

## Run locally

    npm install
    npm run dev

Use a development Firebase project and review its Authentication and Firestore configuration before testing. Do not publish production credentials or commit local configuration.

## Scripts

- `npm run dev` starts Vite.
- `npm run build` creates a production bundle.
- `npm run lint` runs ESLint.
- `npm run preview` serves a production build locally.
