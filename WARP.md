# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a comprehensive B2B marketplace application built with Next.js 15, featuring federated authentication via Clerk. The platform connects buyers and sellers across India, offering product browsing, RFQ management, quotation systems, order processing, and business analytics. Users can operate as buyers, sellers, or both.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application with Turbopack  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Setup Requirements
- Install CSS modules type definitions: `npm install --save-dev @types/css-modules`
- Environment variables must be configured in `.env` file for Clerk authentication
- Install additional dependencies: `npm install clsx tailwind-merge lucide-react`

## Architecture

### Authentication Flow
- Uses Clerk for federated authentication with OAuth providers
- Middleware (`src/middleware.ts`) protects routes - only `/`, `/sign-in/*`, `/sign-up/*` are public
- Protected routes automatically redirect unauthenticated users to sign-in
- User sessions managed by `ClerkProvider` in root layout

### Directory Structure
- `src/app/` - Next.js 15 App Router pages
- `src/app/layout.tsx` - Root layout with ClerkProvider wrapper
- `src/app/page.tsx` - B2B marketplace landing page
- `src/app/(auth)/setup-profile/` - Multi-step business profile setup
- `src/app/(protected)/dashboard/` - Unified role-based dashboard
- `src/app/(protected)/buyer/` - Buyer-specific pages (browse, RFQs, orders)
- `src/app/(protected)/seller/` - Seller-specific pages (products, analytics)
- `src/app/sign-in/[[...rest]]/` - Clerk sign-in catch-all route
- `src/app/sign-up/[[...rest]]/` - Clerk sign-up catch-all route
- `src/types/` - TypeScript interfaces and enums
- `src/lib/` - Utility functions and helpers
- `src/components/` - Reusable UI components

### Key Technologies
- Next.js 15 with App Router and Turbopack
- TypeScript with strict configuration
- Tailwind CSS v4 with PostCSS
- Clerk for authentication (@clerk/nextjs)
- Custom fonts: Geist Sans & Geist Mono

### Environment Configuration
Required environment variables for Clerk:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key  
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard`

### Authentication Patterns
- Server-side auth checks using `auth()` from `@clerk/nextjs/server`
- Client-side components: `SignInButton`, `UserButton` from `@clerk/nextjs`
- Route protection via middleware with `createRouteMatcher`
- Automatic redirects for unauthorized access to protected routes
- Multi-step profile setup after initial authentication
- Role-based access control (Buyer, Seller, Both)

### Business Logic Architecture
- **User Roles**: Buyers source products, Sellers list inventory, Both can do everything
- **Business Profiles**: Required verification, ratings, contact info, document uploads
- **Product Management**: Categories, specifications, pricing, inventory tracking
- **RFQ System**: Buyers create requests, sellers submit quotations
- **Order Processing**: Quote acceptance, order fulfillment, tracking
- **Analytics**: Sales reports, product performance, customer insights

## Development Notes

### CSS Modules Support
The project includes `@types/css-modules` to resolve TypeScript issues with `.module.css` files.

### Build Configuration  
- Uses Turbopack for faster builds and development
- TypeScript path mapping: `@/*` resolves to `./src/*`
- ESLint extends Next.js core web vitals and TypeScript rules

### Styling Approach
Uses Tailwind CSS with gradient backgrounds, responsive design, and modern component patterns. The UI follows a slate/blue/purple color scheme with glassmorphism effects.