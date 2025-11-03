'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, LogOut } from 'lucide-react'
import { getUser, logout, type User } from '@/lib/auth'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const currentUser = getUser()
    if (!currentUser) {
      router.push('/signin')
      return
    }
    if (currentUser.role !== 'admin') {
      router.push('/buyer-dashboard')
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
      <nav className="bg-[#054a4e] text-white" role="navigation" aria-label="Dashboard navigation">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold text-white">
            Airavat
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/80">{user.email}</span>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-4 py-2 font-medium text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#054a4e]"
              aria-label="Logout from dashboard"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-12" role="main" aria-labelledby="dashboard-heading">
        <div>
          <h1 id="dashboard-heading" className="text-3xl font-bold text-[#054a4e]">Supplier Dashboard</h1>
          <p className="mt-2 text-base text-slate-600">Welcome back, {user.email}</p>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-label="Dashboard statistics">
          {[
            { value: '142', label: 'Products Listed', trend: '+12% this month' },
            { value: '28', label: 'Pending Inquiries', trend: '+5 new' },
            { value: '$24.5K', label: 'Total Sales', trend: '+8.2%' },
            { value: '4.8', label: 'Average Rating', trend: '+0.3' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-3xl font-bold text-[#054a4e]">{stat.value}</div>
              <div className="mt-2 text-sm text-slate-500">{stat.label}</div>
              <div className="mt-4 text-sm font-medium text-emerald-600">{stat.trend}</div>
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm" aria-labelledby="quick-actions-heading">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h3 id="quick-actions-heading" className="text-lg font-semibold text-[#1a1a1a]">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 px-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
            <button className="rounded-lg bg-[#02c4cb] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#00aeb4] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:ring-offset-2">
              Add Product
            </button>
            <button className="rounded-lg border border-[#054a4e] px-4 py-2 text-sm font-semibold text-[#054a4e] transition hover:bg-[#054a4e] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#054a4e] focus:ring-offset-2">
              View Inquiries
            </button>
            <button className="rounded-lg border border-[#054a4e] px-4 py-2 text-sm font-semibold text-[#054a4e] transition hover:bg-[#054a4e] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#054a4e] focus:ring-offset-2">
              Manage Orders
            </button>
            <button className="rounded-lg border border-[#054a4e] px-4 py-2 text-sm font-semibold text-[#054a4e] transition hover:bg-[#054a4e] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#054a4e] focus:ring-offset-2">
              View Analytics
            </button>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm" aria-labelledby="recent-activity-heading">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h3 id="recent-activity-heading" className="text-lg font-semibold text-[#1a1a1a]">Recent Activity</h3>
          </div>
          <div className="px-6 py-10">
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-12 text-center">
              <Package className="h-16 w-16 text-slate-300" aria-hidden="true" />
              <h4 className="text-xl font-semibold text-[#1a1a1a]">No recent activity</h4>
              <p className="text-sm text-slate-500">Your recent orders and inquiries will appear here.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
