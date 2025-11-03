'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { validateEmail, validatePassword, validatePasswordMatch } from '@/lib/validation'
import { PasswordStrength } from '@/components/ui/PasswordStrength'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Email validation
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.errors[0]
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors[0]
    }

    // Confirm password validation
    const matchValidation = validatePasswordMatch(formData.password, formData.confirmPassword)
    if (!matchValidation.isValid) {
      newErrors.confirmPassword = matchValidation.errors[0]
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Show success message
        setSuccessMessage('Account created successfully! Redirecting...')
        
        // Redirect to signin or dashboard after a brief delay
        setTimeout(() => {
          router.push('/signin')
        }, 1500)
      } else {
        setErrors({ submit: data.error || 'Failed to create account' })
      }
    } catch {
      setErrors({ submit: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white lg:flex-row">
      {/* Skip to main content */}
      <a
        href="#signup-form"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#02c4cb] focus:text-white focus:rounded-lg"
      >
        Skip to sign up form
      </a>
      {/* Left Side - Form */}
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-12" id="signup-form" role="main" aria-labelledby="signup-heading">
        <div className="w-full max-w-lg space-y-10">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center">
            <Image src="/icon.svg" alt="Airavat" width={150} height={50} className="h-12 w-auto" />
          </Link>

          {/* Header */}
          <div className="space-y-2">
            <h1 id="signup-heading" className="text-3xl font-bold text-[#054a4e]">Create your account</h1>
            <p className="text-base text-slate-600">Join thousands of businesses on Airavat</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 flex items-center gap-2" role="alert">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              {successMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Sign up form">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-[#02c4cb] focus:outline-none focus:ring-2 focus:ring-[#02c4cb]/20"
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium text-slate-700">
                I am a
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
                className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-[#02c4cb] focus:outline-none focus:ring-2 focus:ring-[#02c4cb]/20"
              >
                <option value="user">Buyer</option>
                <option value="admin">Supplier/Seller</option>
              </select>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pr-10 text-sm text-slate-900 shadow-sm transition focus:border-[#02c4cb] focus:outline-none focus:ring-2 focus:ring-[#02c4cb]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition hover:text-slate-600 focus:outline-none focus:text-slate-900"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              {!errors.password && formData.password && (
                <PasswordStrength password={formData.password} />
              )}
              <p className="text-xs text-slate-500">
                Must contain: uppercase, lowercase, number, and special character
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-[#02c4cb] focus:outline-none focus:ring-2 focus:ring-[#02c4cb]/20"
              />
              {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {errors.submit}
              </div>
            )}

            {/* Terms */}
            <div className="text-xs text-slate-500">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="font-semibold text-[#054a4e] hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="font-semibold text-[#054a4e] hover:underline">
                Privacy Policy
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#02c4cb] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#00aeb4] focus:outline-none focus:ring-2 focus:ring-[#02c4cb] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={loading || !!successMessage}
              aria-label="Create account"
            >
              {loading ? (
                <>
                  <span className="mr-3 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Sign In Link */}
            <p className="text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/signin" className="font-semibold text-[#054a4e] hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>

      {/* Right Side - Image/Branding */}
      <aside className="relative hidden flex-1 items-center justify-center bg-[linear-gradient(135deg,#054a4e_0%,#02c4cb_100%)] p-12 text-white lg:flex" aria-label="Platform benefits">
        <div className="max-w-md text-center">
          <h2 className="text-4xl font-bold leading-tight">Connect with Global Suppliers</h2>
          <p className="mt-6 text-base text-white/80">
            Source quality products, negotiate better prices, and grow your business with Airavat B2B marketplace.
          </p>
          <div className="mt-10 space-y-4 text-left">
            {[
              'Access to 50,000+ verified suppliers',
              'Secure payment and trade protection',
              'Real-time order tracking',
              '24/7 customer support',
            ].map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20" aria-hidden="true">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <p className="text-sm text-white/80">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
