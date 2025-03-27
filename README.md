# Link Manager

A web application for managing and organizing your links, built with Next.js.

## Features

- User authentication
- Dashboard for link management
- Add and organize links
- Profile customization
- Email verification

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for server-side rendering
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Component library

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/istiakahmeed/link-manager.git
cd link-manager
```

2. Install dependencies

```bash
pnpm install
```

3. Create a `.env` file with required environment variables (see `.env.example`)

4. Run the development server

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable UI components
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and libraries
- `/public` - Static assets
- `/types` - TypeScript type definitions

## Deployment

Deploy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Flink-manager)

## License

[MIT](LICENSE)
