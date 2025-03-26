# Wedding App Frontend

Welcome to my first Vue.js project that is connected to my new Express.js & Node backend.
Here i am using Vite, Vue,js, Nuxt.js, Typescript, npm.

## Folder Setup

├── app.vue
├── nuxt.config.ts
├── public/
├── assets/
│ └── css/ # global styles
├── components/ # dumb UI components (no logic)
├── pages/ # Nuxt routes
├── layouts/ # shared page shells
├── composables/ # useSomething() logic (hooks)
├── stores/ # Pinia state management (calls use cases)
├── domain/ # Pure logic (entities + use cases)
│ ├── models/ # e.g. Invitation.ts, User.ts
│ └── usecases/ # e.g. createInvitation.ts, login.ts
├── infrastructure/ # API services, localStorage access
│ └── api/ # axios configs and API endpoints
├── application/ # Glue layer (calls use cases, maps models)
│ └── services/ # e.g. AuthService, InvitationService
└── types/ # Shared types/interfaces

---

[Nuxt documentation](https://nuxt.com/docs/getting-started/introduction).
