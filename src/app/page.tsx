import Image from 'next/image'
import Link from 'next/link'
import { Package, TrendingUp, Users, Globe, ArrowRight, Search } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Airavat - Global B2B Marketplace | Connect with Verified Suppliers',
  description: 'Source quality products from 50,000+ verified suppliers worldwide. Negotiate better prices, manage RFQs, and grow your business with Airavat B2B marketplace.',
  keywords: ['B2B marketplace', 'wholesale suppliers', 'bulk orders', 'RFQ management', 'verified suppliers', 'global trade', 'business sourcing'],
  openGraph: {
    title: 'Airavat - Global B2B Marketplace',
    description: 'Connect with verified suppliers worldwide and grow your business',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airavat - Global B2B Marketplace',
    description: 'Connect with verified suppliers worldwide',
  },
}

const categories = [
  'Electronics',
  'Machinery',
  'Textiles',
  'Agriculture',
  'Chemicals',
  'Automotive',
  'Construction',
  'Packaging',
]

const navTabs = ['All Categories', 'Electronics', 'Machinery', 'Textiles', 'Request Quote', 'Trade Services']

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#02c4cb] focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-[#054a4e]"
      >
        Skip to main content
      </a>
      {/* Top Navigation */}
      <nav className="bg-[#054a4e] text-white" role="navigation" aria-label="Main navigation">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex flex-1 items-center gap-4">
            <Image src="/icon.svg" alt="Airavat Logo" width={120} height={40} className="h-10 w-auto" priority />
            <div className="hidden w-full max-w-md flex-1 sm:block">
              <label htmlFor="global-search" className="sr-only">
                Search products
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" aria-hidden="true" />
                <input
                  id="global-search"
                  type="search"
                  placeholder="Search products, suppliers..."
                  className="h-10 w-full rounded-lg border border-white/20 bg-white/10 pl-10 pr-4 text-sm text-white placeholder:text-white/70 focus:border-white focus:bg-white focus:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb]/50"
                  aria-label="Search products and suppliers"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center rounded-lg bg-[#02c4cb] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#00aeb4]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Category Navigation */}
      <nav className="border-b border-slate-200 bg-white" role="navigation" aria-label="Category navigation">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-3 overflow-x-auto py-3 text-sm font-medium text-[#054a4e]">
            {navTabs.map((tab, index) => (
              <button
                key={tab}
                type="button"
                className={`whitespace-nowrap rounded-full border px-4 py-2 transition ${index === 0
                    ? 'border-[#02c4cb] bg-[#02c4cb]/10 text-[#054a4e]'
                    : 'border-transparent text-[#054a4e]/80 hover:border-[#02c4cb]/40 hover:bg-[#02c4cb]/10 hover:text-[#054a4e]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="main-content" className="bg-[linear-gradient(135deg,#054a4e_0%,#02c4cb_100%)] py-20 text-white" aria-labelledby="hero-heading">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
          <div className="space-y-6">
            <h1 id="hero-heading" className="text-4xl font-bold leading-tight sm:text-5xl">
              Connect with Global Suppliers
            </h1>
            <p className="max-w-xl text-lg text-white/80">
              Source quality products, negotiate better prices, and grow your business with Airavat B2B marketplace.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center rounded-lg bg-[#02c4cb] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#00aeb4] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#054a4e]"
              >
                Start Sourcing
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center rounded-lg border border-white/60 px-6 py-3 text-base font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#054a4e]"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-72 w-full sm:h-80" aria-hidden="true">
              <div className="flex h-full items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <Globe className="h-32 w-32 text-white/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section id="features" className="bg-[#f8f7f4] py-16" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-6xl space-y-10 px-4">
          <div className="text-center">
            <h2 id="categories-heading" className="text-3xl font-bold text-[#054a4e]">Browse by Category</h2>
            <p className="mt-2 text-base text-slate-600">Discover products from verified suppliers</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:ring-offset-2 w-full"
                aria-label={`Browse ${category} category with over 1000 products`}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-[#054a4e]/10" aria-hidden="true">
                  <Package className="h-8 w-8 text-[#054a4e]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a1a]">{category}</h3>
                <p className="mt-2 text-sm text-slate-500">1000+ products</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16" aria-labelledby="products-heading">
        <div className="mx-auto max-w-6xl space-y-10 px-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="products-heading" className="text-3xl font-bold text-[#054a4e]">Trending Products</h2>
              <p className="mt-2 text-base text-slate-600">Popular items from verified suppliers</p>
            </div>
            <Link
              href="/products"
              className="self-start inline-flex items-center rounded-lg border border-[#054a4e] px-4 py-2 text-sm font-semibold text-[#054a4e] transition hover:bg-[#054a4e] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#054a4e] focus:ring-offset-2"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <article
                key={index}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-[#02c4cb] focus-within:ring-offset-2"
              >
                <div className="aspect-square w-full bg-[#f0efe9] flex items-center justify-center" aria-hidden="true">
                  <Package className="h-16 w-16 text-slate-300" />
                </div>
                <div className="flex flex-1 flex-col gap-3 px-5 py-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1a1a1a]">Industrial LED Light Fixture</h3>
                    <p className="mt-2 text-sm text-slate-500">LED Lighting Solutions Co.</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-[#054a4e]" aria-label="Price: $45.00">$45.00</div>
                      <div className="text-sm text-slate-500" aria-label="Minimum order quantity: 100 pieces">MOQ: 100 pcs</div>
                    </div>
                    <button
                      className="rounded-lg bg-[#02c4cb] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#00aeb4] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:ring-offset-2"
                      aria-label="Inquire about Industrial LED Light Fixture"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#f8f7f4] py-16" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Platform Statistics</h2>
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: '50K+', label: 'Verified Suppliers', icon: Users },
            { value: '2M+', label: 'Products Listed', icon: Package },
            { value: '150+', label: 'Countries Served', icon: Globe },
            { value: '99.8%', label: 'Customer Satisfaction', icon: TrendingUp },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <Icon className="mx-auto mb-3 h-8 w-8 text-[#054a4e]/60" aria-hidden="true" />
                <div className="text-3xl font-bold text-[#054a4e]" aria-label={`${stat.value} ${stat.label}`}>{stat.value}</div>
                <div className="mt-2 text-sm text-slate-600">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#054a4e] py-16 text-white" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 id="cta-heading" className="text-3xl font-bold sm:text-4xl">Ready to Start Sourcing?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Join thousands of businesses already sourcing with Airavat.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center rounded-lg bg-[#02c4cb] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#00aeb4] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#054a4e]"
            >
              Create Free Account
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg border border-white/70 px-6 py-3 text-base font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#054a4e]"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-200 bg-[#f0efe9] py-16" role="contentinfo" aria-label="Site footer">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#054a4e]">About Airavat</h4>
              <p className="text-sm text-slate-600">
                Your trusted B2B marketplace connecting buyers and suppliers worldwide.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#054a4e]">Quick Links</h4>
              <div className="flex flex-col gap-2 text-sm text-slate-600">
                <a href="/about" className="transition hover:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:rounded">About Us</a>
                <a href="/how-it-works" className="transition hover:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:rounded">How It Works</a>
                <a href="/suppliers" className="transition hover:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:rounded">Supplier Directory</a>
                <a href="/services" className="transition hover:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:rounded">Trade Services</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#054a4e]">For Buyers</h4>
              <div className="flex flex-col gap-2 text-sm text-slate-600">
                <a href="/quote" className="transition hover:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:rounded">Request Quotation</a>
                <a href="/products" className="transition hover:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:rounded">Product Search</a>
                <a href="/assurance" className="transition hover:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:rounded">Trade Assurance</a>
                <a href="/protection" className="transition hover:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:rounded">Buyer Protection</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#054a4e]">For Suppliers</h4>
              <div className="flex flex-col gap-2 text-sm text-slate-600">
                <a href="/list-products" className="transition hover:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:rounded">List Products</a>
                <a href="/membership" className="transition hover:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:rounded">Membership Plans</a>
                <a href="/resources" className="transition hover:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:rounded">Supplier Resources</a>
                <a href="/stories" className="transition hover:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:rounded">Success Stories</a>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4 border-t border-slate-300 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2025 Airavat. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="/privacy" className="transition hover:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:rounded">Privacy Policy</a>
              <a href="/terms" className="transition hover:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:rounded">Terms of Service</a>
              <a href="/contact" className="transition hover:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:rounded">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
