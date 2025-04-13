[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner-direct-single.svg)](https://stand-with-ukraine.pp.ua)
![Vercel Deploy](https://therealsujitk-vercel-badge.vercel.app/?app=an-artist-art&style=plastic)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Turskyi/nextjs-ecommerce)
<img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/Turskyi/nextjs-ecommerce">

# Anna's Artistic Store (Web)

Welcome to **Anna's Artistic Store**, a shop where creativity comes to life! 🎨

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Available Versions

- **Next.js Version (Web)**:
  [https://anartist.turskyi.com](https://anartist.turskyi.com)  
   This version is built with Next.js and serves as the primary web application.
  It provides server-side rendering and SEO optimization, along with a RESTful
  API backend.

- **Flutter Version (Web)**:
  [https://anna-ecommerce.web.app](https://anna-ecommerce.web.app)  
   This version is built with Flutter for the web. It was created because
  Firebase hosting is free and easy to set up, requiring no additional
  maintenance. However, it is not used as the primary version due to Flutter
  web's limitations in server-side rendering and SEO optimization.

### Why Both Versions?

Having both versions allows us to leverage the strengths of each platform. The
Next.js version is optimized for SEO and serves as the backend API provider,
while the Flutter version showcases the flexibility of Flutter for web.
Since Firebase hosting is free and effortless to maintain, it made sense to have
it as an additional option.

## Overview

**Anna's Artistic Store** is an e-commerce project dedicated to showcasing
unique and handmade creations by talented artist
[Anna](https://www.instagram.com/anartistart).
From stylish clothes to whimsical soft toys, each piece is crafted with care and passion.

## Features

- Gallery: Explore our gallery to discover a delightful collection of artistic
  creations.
- Product Details: Click on any item to view detailed information, including
  descriptions, materials, and pricing.
- Cart: Mark your favorite pieces and create your personalized cart.
- Contact: Have questions or want to place an order?
  Reach out to us via the contact form.

## Getting Started

### Installation:

Clone this repository to your local machine.
Install dependencies using npm install.

### Run Locally:

First, run the development server:

```bash
npm i daisyui prisma @prisma/client next-auth @auth/prisma-adapter prettier eslint-config-prettier prettier-plugin-tailwindcss

npm i zod

npx prisma init

npx prisma db pull

npx prisma db push

npx prisma generate

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Technologies Used

- [Next.js](https://nextjs.org/): A React framework for building full-stack web
  applications.

- [`MongoDB`](https://www.mongodb.com/): Store product data and manage
  inventory.

- [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to
  automatically optimize and load Rubik, a custom Google Font.

- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom
  designs.

- **Programming language**: [TypeScript](https://www.typescriptlang.org);

- **Version control system**: [Git](https://git-scm.com);

- **Git Hosting Service**: [GitHub](https://github.com);

- **CI/CD**: [Vercel](https://vercel.com/features/previews) is used to
  deliver the new releases to the production environment after every push to the
  **master** branch;

- **Architectural pattern** :
  [Monolith](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures#all-in-one-applications);

- **Code Readability:** code is easily readable with no unnecessary blank lines,
  no unused variables or methods, and no commented-out code, all variables,
  methods, and resource IDs are descriptively named such that another developer
  reading the code can easily understand their function.

## Contributing

We welcome contributions!
If you’re an artist, designer, or developer, feel free to join our creative
community.
Fork this repository, make your enhancements, and submit a pull request.

## Contact

For inquiries, collaborations, or custom orders, reach out to us at
support@turskyi.com.

Let’s celebrate art together! 🌟🎨

## Screenshot:

<!--suppress CheckImageSize -->
<img src="screenshots/Web-Screenshot-2024-04-14.png" width="700"  alt="screenshot">

## Credits

This project is based on the
[Next.js 14 E-Commerce Website (Server Actions, TypeScript, Deployment, TailwindCSS, Prisma, DaisyUI)](https://youtu.be/AaiijESQH5o?si=2Bxmsw5_tHhQ6gEN)
by [Coding in Flow](https://github.com/codinginflow) YouTube channel.
All credit goes to the original author
[Florian Walther](https://github.com/florianwalther-private).
I only followed along and made some minor changes.
