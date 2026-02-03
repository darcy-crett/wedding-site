'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (data.success) {
        router.push('/')
        router.refresh()
      } else {
        setError('Incorrect password. Please try again.')
        setLoading(false)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen relative flex items-center justify-center p-6">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://mduhfpicobfaqgwhxtbp.supabase.co/storage/v1/object/public/hero-images/ducks_watercolour2.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-sage-200">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-sage-900 mb-2">
            Kaylah & Darcy
          </h1>
          {/* <p className="text-sage-700">November 14, 2026</p> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-sage-800 mb-2">
              Enter Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-sage-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              placeholder="Password"
              required
            />
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 bg-sage-700 text-white rounded-lg hover:bg-sage-800 transition-colors disabled:bg-sage-300 disabled:cursor-not-allowed font-medium shadow-md"
          >
            {loading ? 'Checking...' : 'Enter'}
          </button>
        </form>

        <p className="text-center text-sm text-sage-600 mt-6">
          If you don't have the password, please contact the couple.
        </p>
      </div>
    </main>
  )
}