'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getUser, logout, type User } from '@/lib/auth'

export default function BuyerDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const currentUser = getUser()
    if (!currentUser) {
      router.push('/signin')
      return
    }
    setUser(currentUser)
  }, [router])

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7f4]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#02c4cb]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* Navigation */}
      <nav className="bg-[#054a4e] text-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold text-white">
            Airavat
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/80">{user.email}</span>
            <button
              onClick={logout}
              className="rounded-lg border border-white/40 px-4 py-2 font-medium text-white transition hover:border-white hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-12">
        <div>
          <h1 className="text-3xl font-bold text-[#054a4e]">Buyer Dashboard</h1>
          <p className="mt-2 text-base text-slate-600">Welcome back, {user.email}</p>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: '12', label: 'Active Orders', trend: '+3 new', trendColor: 'text-emerald-600' },
            { value: '8', label: 'Pending Quotes', trend: '2 responses', trendColor: 'text-slate-500' },
            { value: '$18.2K', label: 'Total Spent', trend: '+15%', trendColor: 'text-emerald-600' },
            { value: '24', label: 'Saved Suppliers', trend: '-', trendColor: 'text-slate-500' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-3xl font-bold text-[#054a4e]">{stat.value}</div>
              <div className="mt-2 text-sm text-slate-500">{stat.label}</div>
              <div className={`mt-4 text-sm font-medium ${stat.trendColor}`}>{stat.trend}</div>
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 px-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-[#02c4cb] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#00aeb4]"
            >
              Browse Products
            </Link>
            <button className="rounded-lg border border-[#054a4e] px-4 py-2 text-sm font-semibold text-[#054a4e] transition hover:bg-[#054a4e] hover:text-white">
              Request Quote
            </button>
            <button className="rounded-lg border border-[#054a4e] px-4 py-2 text-sm font-semibold text-[#054a4e] transition hover:bg-[#054a4e] hover:text-white">
              Track Orders
            </button>
            <button className="rounded-lg border border-[#054a4e] px-4 py-2 text-sm font-semibold text-[#054a4e] transition hover:bg-[#054a4e] hover:text-white">
              Saved Items
            </button>
          </div>
        </section>

        {/* Recent Orders */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Recent Orders</h3>
          </div>
          <div className="px-6 py-10">
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-12 text-center">
              <div className="text-4xl">🛒</div>
              <h4 className="text-xl font-semibold text-[#1a1a1a]">No orders yet</h4>
              <p className="text-sm text-slate-500">Start shopping to see your orders here.</p>
              <Link
                href="/"
                className="rounded-lg bg-[#02c4cb] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#00aeb4]"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </section>

        {/* Recommended Suppliers */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Recommended Suppliers</h3>
          </div>
          <div className="grid grid-cols-1 gap-6 px-6 py-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex aspect-video w-full items-center justify-center bg-[#f8f7f4] text-4xl">
                  🏭
                </div>
                <div className="flex flex-1 flex-col gap-3 px-5 py-6">
                  <h4 className="text-lg font-semibold text-[#1a1a1a]">ABC Manufacturing Co.</h4>
                  <p className="text-sm text-slate-500">Electronics &amp; Components</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Verified
                    </span>
                    <span className="text-sm text-slate-600">⭐ 4.8 (120 reviews)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
