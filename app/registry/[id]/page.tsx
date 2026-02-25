'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../../context/CartContext'

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default function ContributePage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [amount, setAmount] = useState('')
  const [item, setItem] = useState<any>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchItem() {
      const res = await fetch(`/api/registry-item/${id}`)
      const data = await res.json()
      
      if (data) {
        setItem(data)
        setAmount((data.price / 100).toString())
      }
    }
    fetchItem()
  }, [id])

  const handleAddToCart = () => {
    const amountInCents = Math.round(parseFloat(amount) * 100)
    
    if (!item || amountInCents < (item.minimum_amount || 1000)) {
      alert(`Minimum contribution is $${((item?.minimum_amount || 1000) / 100).toFixed(0)}`)
      return
    }

    addToCart({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      minimum_amount: item.minimum_amount,
      image_url: item.image_url,
      amount: amountInCents,
    })

    router.push('/cart')
  }

  if (!item) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100 flex items-center justify-center p-6">
        <div className="text-sage-700 text-lg 2xl:text-xl">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100 flex items-center justify-center p-6 2xl:p-12">
      <div className="w-full max-w-xl 2xl:max-w-3xl bg-white rounded-2xl shadow-lg p-10 2xl:p-16 border border-sage-200">
        <h1 className="text-4xl 2xl:text-5xl font-serif text-sage-900 mb-3 2xl:mb-4 text-center">
          {item.title}
        </h1>
        <p className="text-sage-700 text-base 2xl:text-lg text-center mb-8 2xl:mb-12">
          {item.description}
        </p>

        <label className="block mb-6 2xl:mb-8">
          <span className="block text-sm 2xl:text-base text-sage-800 mb-2 font-medium">
            Contribution amount
          </span>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-700 text-lg 2xl:text-xl">$</span>
            <input
              type="number"
              min={(item.minimum_amount || 1000) / 100}
              step="1"
              className="w-full border-2 border-sage-200 rounded-lg p-3 pl-8 2xl:p-4 2xl:pl-10 text-base 2xl:text-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder={(item.price / 100).toString()}
            />
          </div>
          <p className="text-xs 2xl:text-sm text-sage-600 mt-1">
            Suggested: ${(item.price / 100).toFixed(0)} • Minimum: ${((item.minimum_amount || 1000) / 100).toFixed(0)}
          </p>
        </label>

        <button
          onClick={handleAddToCart}
          disabled={!amount || parseFloat(amount) < ((item.minimum_amount || 1000) / 100)}
          className="w-full py-4 2xl:py-5 text-lg 2xl:text-xl bg-sage-700 text-white rounded-lg hover:bg-sage-800 transition-colors disabled:bg-sage-300 disabled:cursor-not-allowed font-medium shadow-md"
        >
          Add to Cart - ${parseFloat(amount || '0').toFixed(2)}
        </button>

        <p className="text-sm 2xl:text-base text-sage-600 text-center mt-4 2xl:mt-6">
          You'll be able to add your name and message at checkout
        </p>
      </div>
    </main>
  )
}