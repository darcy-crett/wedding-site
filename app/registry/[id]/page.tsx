'use client'

import { use, useState, useEffect } from 'react'
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
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [item, setItem] = useState<any>(null)

  useEffect(() => {
    async function fetchItem() {
      const res = await fetch(`/api/registry-item/${id}`)
      const data = await res.json()
      
      if (data) {
        setItem(data)
        // Pre-fill with suggested amount
        setAmount((data.price / 100).toString())
      }
    }
    fetchItem()
  }, [id])

  const handleSubmit = async () => {
    const amountInCents = Math.round(parseFloat(amount) * 100)
    
    // Validate minimum amount
    if (!item || amountInCents < (item.minimum_amount || 1000)) {
      alert(`Minimum contribution is $${((item?.minimum_amount || 1000) / 100).toFixed(0)}`)
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          registryItemId: id, 
          name, 
          message,
          amount: amountInCents 
        })
      })
      
      const data = await res.json()

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

  if (!item) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100 flex items-center justify-center p-6">
        <div className="text-sage-700">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-10 border border-sage-200">
        <h1 className="text-4xl font-serif text-sage-900 mb-3 text-center">
          {item.title}
        </h1>
        <p className="text-sage-700 text-center mb-8">
          {item.description}
        </p>

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

        <label className="block mb-6">
          <span className="block text-sm text-sage-800 mb-2 font-medium">
            Contribution amount
          </span>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-700 text-lg">$</span>
            <input
              type="number"
              min={(item.minimum_amount || 1000) / 100}
              step="1"
              className="w-full border-2 border-sage-200 rounded-lg p-3 pl-8 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder={(item.price / 100).toString()}
            />
          </div>
          <p className="text-xs text-sage-600 mt-1">
            Suggested: ${(item.price / 100).toFixed(0)} • Minimum: ${((item.minimum_amount || 1000) / 100).toFixed(0)}
          </p>
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
          disabled={loading || !name.trim() || !amount || parseFloat(amount) < ((item.minimum_amount || 1000) / 100)}
          className="w-full py-4 bg-sage-700 text-white rounded-lg hover:bg-sage-800 transition-colors disabled:bg-sage-300 disabled:cursor-not-allowed font-medium text-lg shadow-md"
        >
          {loading ? 'Processing…' : `Contribute $${parseFloat(amount || '0').toFixed(2)}`}
        </button>
      </div>
    </main>
  )
}