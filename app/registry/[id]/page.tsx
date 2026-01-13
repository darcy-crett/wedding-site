'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default function ContributePage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registryItemId: id, name, message })
      })
      
      console.log('Response status:', res.status)
      const data = await res.json()
      console.log('Response data:', data)

      if (data.orderId) {
        router.push(`/thank-you/${data.orderId}`)
      } else {
        alert(`Error: ${data.error || 'Something went wrong. Please try again.'}`)
        setLoading(false)
      }
    } catch (err) {
      console.error('Fetch error:', err)
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-10 border border-sage-200">
        <h1 className="text-4xl font-serif text-sage-900 mb-8 text-center">
          Contribute to Our Registry
        </h1>

        <label className="block mb-6">
          <span className="block text-sm text-sage-800 mb-2 font-medium">
            Your name <span className="text-sage-600 font-normal">(so we know who to thank)</span>
          </span>
          <input
            className="w-full border-2 border-sage-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>

        <label className="block mb-8">
          <span className="block text-sm text-sage-800 mb-2 font-medium">
            Message <span className="text-sage-600 font-normal">(optional)</span>
          </span>
          <textarea
            className="w-full border-2 border-sage-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            rows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Leave a message for the couple..."
          />
        </label>

        <button
          onClick={handleSubmit}
          disabled={loading || !name.trim()}
          className="w-full py-4 bg-sage-700 text-white rounded-lg hover:bg-sage-800 transition-colors disabled:bg-sage-300 disabled:cursor-not-allowed font-medium text-lg shadow-md"
        >
          {loading ? 'Processing…' : 'Confirm contribution'}
        </button>
      </div>
    </main>
  )
}