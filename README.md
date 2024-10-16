# Introduction 
Talexio survey assessment, receiving feedback from users (UI inspiration - typeform), saving data to google sheet.

# Getting Started

Preferred package manager is `yarn`

1.	Installation process

First, install dependencies:

```bash
npm i
# or
yarn i
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

2.	Software dependencies

NodeJS is required to install this app

Version `>=18.17.1`

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# Build and Test

To build the prod server locally:

```bash
npm run build
# or
yarn build
```

To run the prod server locally:

```bash
npm run build
# or
yarn build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


To run unit tests:

```bash
npm run test
# or
yarn test
```

To run integration tests:

First, create a ".env" file and add local url, e.g:

``
NEXT_PUBLIC_API_URL=https://talexio-survey.vercel.app
``

Secondly, run the tests script:

```bash
npm run test:e2e
# or
yarn test:e2e
```

To run integration tests locally:

First, create a ".env" file and add local url, e.g:

``
NEXT_PUBLIC_API_URL=http://localhost:3000
``

Secondly, run the development server:

```bash
npm run dev
# or
yarn dev
```

Then, run integration tests:

```bash
npm run test:e2e
# or
yarn test:e2e
```

Note: one test was skipped on line 6 - src/integration-tests/survey/index.e2e.ts

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 
TODO: Add file naming specs, struturing and arrangement

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!