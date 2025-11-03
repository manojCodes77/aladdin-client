import Image from 'next/image'
import Link from 'next/link'

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
      {/* Top Navigation */}
      <nav className="bg-[#054a4e] text-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex flex-1 items-center gap-4">
            <Image src="/icon.svg" alt="Airavat Logo" width={120} height={40} className="h-10 w-auto" priority />
            <div className="hidden w-full max-w-md flex-1 sm:block">
              <label htmlFor="global-search" className="sr-only">
                Search products
              </label>
              <input
                id="global-search"
                type="search"
                placeholder="Search products, suppliers..."
                className="h-10 w-full rounded-lg border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/70 focus:border-white focus:bg-white focus:text-[#054a4e] focus:outline-none focus:ring-2 focus:ring-[#02c4cb]/50"
              />
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
      <div className="border-b border-slate-200 bg-white">
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
      </div>

      {/* Hero Section */}
      <section className="bg-[linear-gradient(135deg,#054a4e_0%,#02c4cb_100%)] py-20 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Connect with Global Suppliers
            </h1>
            <p className="max-w-xl text-lg text-white/80">
              Source quality products, negotiate better prices, and grow your business with Airavat B2B marketplace.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center rounded-lg bg-[#02c4cb] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#00aeb4]">
                Start Sourcing
              </button>
              <button className="inline-flex items-center rounded-lg border border-white/60 px-6 py-3 text-base font-semibold text-white transition hover:border-white hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/hero-image-placeholder.svg"
              alt="Global sourcing illustration"
              width={420}
              height={320}
              className="h-72 w-auto drop-shadow-xl sm:h-80"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-[#f8f7f4] py-16">
        <div className="mx-auto max-w-6xl space-y-10 px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#054a4e]">Browse by Category</h2>
            <p className="mt-2 text-base text-slate-600">Discover products from verified suppliers</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-[#054a4e]/10 text-3xl">
                  📦
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a1a]">{category}</h3>
                <p className="mt-2 text-sm text-slate-500">1000+ products</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl space-y-10 px-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#054a4e]">Trending Products</h2>
              <p className="mt-2 text-base text-slate-600">Popular items from verified suppliers</p>
            </div>
            <button className="self-start rounded-lg border border-[#054a4e] px-4 py-2 text-sm font-semibold text-[#054a4e] transition hover:bg-[#054a4e] hover:text-white">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-square w-full bg-[#f0efe9]" />
                <div className="flex flex-1 flex-col gap-3 px-5 py-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1a1a1a]">Industrial LED Light Fixture</h3>
                    <p className="mt-2 text-sm text-slate-500">LED Lighting Solutions Co.</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-[#054a4e]">$45.00</div>
                      <div className="text-sm text-slate-500">MOQ: 100 pcs</div>
                    </div>
                    <button className="rounded-lg bg-[#02c4cb] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#00aeb4]">
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#f8f7f4] py-16">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: '50K+', label: 'Verified Suppliers' },
            { value: '2M+', label: 'Products Listed' },
            { value: '150+', label: 'Countries Served' },
            { value: '99.8%', label: 'Customer Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-[#054a4e]">{stat.value}</div>
              <div className="mt-2 text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#054a4e] py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to Start Sourcing?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Join thousands of businesses already sourcing with Airavat.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-lg bg-[#02c4cb] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#00aeb4]">
              Create Free Account
            </button>
            <button className="rounded-lg border border-white/70 px-6 py-3 text-base font-semibold text-white transition hover:border-white hover:bg-white/10">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-[#f0efe9] py-16">
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
                <a href="#" className="transition hover:text-[#054a4e]">About Us</a>
                <a href="#" className="transition hover:text-[#054a4e]">How It Works</a>
                <a href="#" className="transition hover:text-[#054a4e]">Supplier Directory</a>
                <a href="#" className="transition hover:text-[#054a4e]">Trade Services</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#054a4e]">For Buyers</h4>
              <div className="flex flex-col gap-2 text-sm text-slate-600">
                <a href="#" className="transition hover:text-[#054a4e]">Request Quotation</a>
                <a href="#" className="transition hover:text-[#054a4e]">Product Search</a>
                <a href="#" className="transition hover:text-[#054a4e]">Trade Assurance</a>
                <a href="#" className="transition hover:text-[#054a4e]">Buyer Protection</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#054a4e]">For Suppliers</h4>
              <div className="flex flex-col gap-2 text-sm text-slate-600">
                <a href="#" className="transition hover:text-[#054a4e]">List Products</a>
                <a href="#" className="transition hover:text-[#054a4e]">Membership Plans</a>
                <a href="#" className="transition hover:text-[#054a4e]">Supplier Resources</a>
                <a href="#" className="transition hover:text-[#054a4e]">Success Stories</a>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4 border-t border-slate-300 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2025 Airavat. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#" className="transition hover:text-[#054a4e]">Privacy Policy</a>
              <a href="#" className="transition hover:text-[#054a4e]">Terms of Service</a>
              <a href="#" className="transition hover:text-[#054a4e]">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
