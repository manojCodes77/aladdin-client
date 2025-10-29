This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

To start the development server, run one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Project Setup Notes

1. After initializing the project, you may encounter issues with `.tsx` files not recognizing CSS modules. To resolve this, install the necessary type definitions:

```bash
npm install --save-dev @types/css-modules
```