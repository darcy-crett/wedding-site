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
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl mb-6">Contribute</h1>

      <label className="block mb-4">
        <span className="block text-sm mb-1">
          Your name <span className="text-neutral-500">(so we know who to thank)</span>
        </span>
        <input
          className="w-full border rounded p-3"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>

      <label className="block mb-6">
        <span className="block text-sm mb-1">Message (optional)</span>
        <textarea
          className="w-full border rounded p-3"
          rows={3}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </label>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 bg-neutral-900 text-white rounded"
      >
        {loading ? 'Processing…' : 'Confirm contribution'}
      </button>
    </main>
  )
}