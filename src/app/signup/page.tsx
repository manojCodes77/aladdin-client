'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
        alert('Account created successfully!')
        
        // Redirect to signin or dashboard
        router.push('/signin')
      } else {
        setErrors({ submit: data.error || 'Failed to create account' })
      }
    } catch (error) {
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
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left Side - Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)' }}>
        <div style={{ width: '100%', maxWidth: '450px' }}>
          {/* Logo */}
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <Link href="/">
              <Image src="/icon.svg" alt="Airavat" width={150} height={50} style={{ height: '50px', width: 'auto' }} />
            </Link>
          </div>

          {/* Header */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h1 className="h2">Create your account</h1>
            <p className="text-muted mt-2">Join thousands of businesses on Airavat</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="stack" style={{ gap: 'var(--space-4)' }}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-sm text-danger" style={{ marginTop: 'var(--space-2)' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="label">I am a</label>
              <select
                id="role"
                name="role"
                className="select"
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="user">Buyer</option>
                <option value="admin">Supplier/Seller</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="input"
                  placeholder="Create a strong password"
                  autoComplete='off'
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 'var(--space-3)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-danger" style={{ marginTop: 'var(--space-2)' }}>
                  {errors.password}
                </p>
              )}
              <p className="text-xs text-muted" style={{ marginTop: 'var(--space-2)' }}>
                Must be at least 8 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="label">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                className="input"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-danger" style={{ marginTop: 'var(--space-2)' }}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="alert alert-danger">
                {errors.submit}
              </div>
            )}

            {/* Terms */}
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-primary">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-primary">Privacy Policy</Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? (
                <span className="cluster" style={{ gap: 'var(--space-2)' }}>
                  <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></span>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-muted">
                Already have an account?{' '}
                <Link href="/signin" className="text-primary" style={{ fontWeight: 600 }}>
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image/Branding */}
      <div 
        style={{ 
          flex: 1, 
          background: 'linear-gradient(135deg, #054a4e 0%, #02c4cb 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-12)',
          color: 'white',
        }}
        className="hide-mobile"
      >
        <div style={{ maxWidth: '500px', textAlign: 'center' }}>
          <h2 className="h1" style={{ color: 'white', marginBottom: 'var(--space-6)' }}>
            Connect with Global Suppliers
          </h2>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: 'var(--space-8)' }}>
            Source quality products, negotiate better prices, and grow your business with Airavat B2B marketplace.
          </p>
          <div className="stack" style={{ gap: 'var(--space-4)', textAlign: 'left' }}>
            {[
              { icon: '✓', text: 'Access to 50,000+ verified suppliers' },
              { icon: '✓', text: 'Secure payment and trade protection' },
              { icon: '✓', text: 'Real-time order tracking' },
              { icon: '✓', text: '24/7 customer support' },
            ].map((feature, idx) => (
              <div key={idx} className="cluster" style={{ gap: 'var(--space-3)' }}>
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {feature.icon}
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
