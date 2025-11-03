# Airavat - B2B Marketplace Platform

A comprehensive B2B marketplace application built with Next.js 15, featuring federated authentication, product browsing, RFQ management, quotation systems, and business analytics.

## 🚀 Features

- **Authentication**: Clerk-based federated authentication with OAuth providers
- **Multi-Role Support**: Buyers, Sellers, or Both
- **Product Management**: Browse, search, and manage products
- **RFQ System**: Request for Quotation management
- **Order Processing**: Complete order lifecycle management
- **Business Analytics**: Sales reports and insights
- **Responsive Design**: Mobile-first, accessible UI
- **Security**: Comprehensive security headers and validation

## 📋 Prerequisites

- Node.js 18+ and npm
- Clerk account for authentication ([Get started](https://clerk.com))

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd aladdin-client
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file:
```bash
cp env.example .env.local
```

Then update `.env.local` with your actual values:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Auth-related pages
│   ├── (protected)/       # Protected routes
│   ├── layout.tsx         # Root layout with ClerkProvider
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── ErrorBoundary.tsx # Error boundary
├── lib/                   # Utilities and helpers
│   ├── auth.ts           # Auth utilities
│   ├── utils.ts          # General utilities
│   └── validation.ts     # Form validation
└── types/                 # TypeScript types

```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: Clerk (@clerk/nextjs)
- **Icons**: Lucide React
- **Build Tool**: Turbopack

## 🔐 Security Features

- Security headers (HSTS, CSP, X-Frame-Options, etc.)
- Input validation and sanitization
- Password strength requirements
- CSRF protection ready
- XSS protection

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Skip navigation links
- Proper ARIA labels

## 📝 Environment Variables

See `env.example` for all required environment variables.

### Required Variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_API_URL` - Backend API URL

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC License

## 👥 Authors

- manojcodes77

## 🐛 Known Issues

- Authentication currently uses localStorage (temporary - will migrate to Clerk)
- Some routes need middleware protection
- Mock data present in some components

## 📚 Additional Documentation

- See `WARP.md` for detailed project overview
- Check `src/lib/validation.ts` for validation rules
- Review `next.config.ts` for configuration options