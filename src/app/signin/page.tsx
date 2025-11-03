'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Input, Checkbox, Alert } from '@/components/ui'

export default function SigninPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user))
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true')
        }
        
        // Redirect to dashboard based on role
        if (data.user.role === 'admin') {
          router.push('/dashboard')
        } else {
          router.push('/buyer-dashboard')
        }
      } else {
        setErrors({ submit: data.error || 'Invalid credentials' })
      }
    } catch {
      setErrors({ submit: 'Network error. Please check your connection and try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left Side - Sign In Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <Link href="/">
            <Image 
              src="/icon.svg" 
              alt="AladdinNow Logo" 
              width={150} 
              height={50}
              className="h-12 w-auto"
            />
          </Link>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-[#054a4e] font-medium hover:underline">
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              fullWidth
              type="button"
              onClick={() => console.log('Google sign in')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mr-2">
                <path d="M19.8055 10.2292C19.8055 9.55056 19.7499 8.86722 19.6305 8.19861H10.2V12.0486H15.6014C15.3773 13.2917 14.6571 14.3889 13.6025 15.0875V17.5861H16.8251C18.7175 15.8431 19.8055 13.2722 19.8055 10.2292Z" fill="#4285F4"/>
                <path d="M10.2 20C12.897 20 15.1714 19.1042 16.8293 17.5861L13.6067 15.0875C12.7119 15.6972 11.5573 16.0417 10.2042 16.0417C7.59474 16.0417 5.38272 14.2833 4.5965 11.9167H1.27393V14.4917C2.96105 17.8583 6.41895 20 10.2 20Z" fill="#34A853"/>
                <path d="M4.59232 11.9167C4.18232 10.6736 4.18232 9.33056 4.59232 8.0875V5.5125H1.27393C-0.138509 8.33611 -0.138509 11.6681 1.27393 14.4917L4.59232 11.9167Z" fill="#FBBC04"/>
                <path d="M10.2 3.95833C11.6282 3.93611 13.0071 4.47222 14.0407 5.45833L16.8918 2.60694C15.0785 0.904721 12.6832 -0.0298595 10.2 0.000139476C6.41895 0.000139476 2.96105 2.14167 1.27393 5.5125L4.5965 8.0875C5.37853 5.71667 7.59474 3.95833 10.2 3.95833Z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>

            <Button
              variant="outline"
              fullWidth
              type="button"
              onClick={() => console.log('LinkedIn sign in')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#0077B5" className="mr-2">
                <path d="M18.5195 0H1.47656C0.660156 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.660156 20 1.47656 20H18.5195C19.3359 20 20 19.3516 20 18.5586V1.44141C20 0.644531 19.3359 0 18.5195 0ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043ZM4.44922 6.19531C3.49609 6.19531 2.72656 5.42578 2.72656 4.47656C2.72656 3.52734 3.49609 2.75781 4.44922 2.75781C5.39844 2.75781 6.16797 3.52734 6.16797 4.47656C6.16797 5.42188 5.39844 6.19531 4.44922 6.19531ZM17.043 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79688V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4883 7.25781 17.043 9.23438 17.043 11.8047V17.043Z"/>
              </svg>
              Continue with LinkedIn
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.submit && (
              <Alert variant="danger" dismissible onDismiss={() => setErrors({ ...errors, submit: '' })}>
                {errors.submit}
              </Alert>
            )}

            <Input
              label="Email Address"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              fullWidth
              required
              autoComplete="email"
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                fullWidth
                required
                autoComplete="current-password"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Checkbox
                label="Remember me"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              />
              
              <Link href="/forgot-password" className="text-sm text-[#054a4e] hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size={3}
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-[#054a4e] hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#054a4e] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Testimonial */}
      <div className="hidden md:flex items-center justify-center p-12 bg-gradient-to-br from-[#054a4e] to-[#02c4cb] relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full -top-48 -right-48"></div>
        
        <div className="relative z-10 max-w-lg space-y-6 text-white">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-20">
            <path d="M12 26C12 19.373 17.373 14 24 14V20C20.686 20 18 22.686 18 26C18 29.314 20.686 32 24 32H26V38H24C17.373 38 12 32.627 12 26Z" fill="currentColor"/>
            <path d="M30 26C30 19.373 35.373 14 42 14V20C38.686 20 36 22.686 36 26C36 29.314 38.686 32 42 32H44V38H42C35.373 38 30 32.627 30 26Z" fill="currentColor"/>
          </svg>
          
          <blockquote className="text-2xl font-semibold leading-relaxed">
            &ldquo;AladdinNow transformed how we source products. We&apos;ve reduced costs by 30% and found reliable suppliers worldwide.&rdquo;
          </blockquote>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">
              👤
            </div>
            <div>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-sm text-white/80">
                Procurement Manager, TechCorp
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div>
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm text-white/80">Active Buyers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm text-white/80">Products Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold">150+</div>
              <div className="text-sm text-white/80">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
