# Next Auth Protection 🔐

Authentication protection for [**Next.JS**](https://nextjs.org/) pages and routes, powered by [**NextAuth.js**](https://next-auth.js.org/) 🚀

- Protect API routes
- Protect pages
- Protect pages before rendering

## Table of contents

- [📝 Documentation](#documentation)
- [🚀 Features](#features)
- [📦 Installation](#installation)
- [🔧 Usage](#usage)
- [🐞 Common Problems](#common-problems)

## Documentation

To read the full documentation, visit this [document](https://github.com/llapenna/next-auth-protection/tree/main/docs).

## Features

- Fastest way to add authentication protection: with just a few lines of code you can protect every page and API route of your application!
- Almost zero initial configuration: you just need to pass your already created NextAuth.js configuration object, and you're ready to go! `next-auth-protection` will use that config to optimize the verification process.
- Flexible and compatible with every NextJS & NextAuth.js applications: works with every provider, adaptar and database supported by NextAuth.js.

## Installation

To start using Next Auth Protection, install the package:

```bash
# npm
npm install next-auth-protection

# yarn
yarn add next-auth-protection◊
```

## Usage

To start using Next Auth Protection, follow these steps:

1. Initialize NextAuth.js 🔌

Make sure you have at least one provider [set up and working](https://next-auth.js.org/getting-started/example) in your project and you're [wrapping your application](https://next-auth.js.org/getting-started/example#configure-shared-session-state) with the `<SessionProvider>` component (needed in the package's `page` protector).

2. Create your `WithAuthProtection` instance 🛡️

Using your NextAuth.js configuration object, create a new instance of `WithAuthProtection`:

```js
import { WithAuthProtection } from 'next-auth-protection';

const authProtection = new WithAuthProtection(NEXTAUTH_OPTIONS);
```

3. Protect your routes 🔐

You can protect your routes in three ways:

```js
const authProtection = new WithAuthProtection(NEXTAUTH_OPTIONS);

// 1 - protect pages directly
const MyPage = authProtection.page(() => {
  return <h1>My page</h1>;
});

// 2 - protect pages before rendering
export const getServerSideProps = authProtection.getServerSideProps(() => {
  return {
    props: {
      message: 'Hello world',
    },
  };
});

// 3 - protect API routes
const handler = authProtection.api(async (req, res) => {
  res.status(200).json({ message: 'Hello world' });
});
```

4. Optional: customize the redirect behavior 🚦

## Common Problems
