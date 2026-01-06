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
    <main className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-serif text-stone-800 mb-6 text-center">
          Contribute to Our Registry
        </h1>

        <label className="block mb-6">
          <span className="block text-sm text-stone-700 mb-2 font-medium">
            Your name <span className="text-stone-500 font-normal">(so we know who to thank)</span>
          </span>
          <input
            className="w-full border border-stone-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>

        <label className="block mb-8">
          <span className="block text-sm text-stone-700 mb-2 font-medium">
            Message <span className="text-stone-500 font-normal">(optional)</span>
          </span>
          <textarea
            className="w-full border border-stone-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
            rows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Leave a message for the couple..."
          />
        </label>

        <button
          onClick={handleSubmit}
          disabled={loading || !name.trim()}
          className="w-full py-3 bg-stone-800 text-white rounded-md hover:bg-stone-700 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed font-medium"
        >
          {loading ? 'Processing…' : 'Confirm contribution'}
        </button>
      </div>
    </main>
  )
}