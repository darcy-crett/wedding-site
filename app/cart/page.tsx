'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const router = useRouter()
  const { cart, removeFromCart, updateAmount, clearCart, cartTotal } = useCart()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!name.trim()) {
      alert('Please enter your name')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim() || null,
          items: cart.map(item => ({
            registryItemId: item.id,
            amount: item.amount,
          })),
        }),
      })

      const data = await res.json()

      if (data.orderId) {
        clearCart()
        router.push(`/thank-you/${data.orderId}`)
      } else {
        alert(`Error: ${data.error || 'Something went wrong. Please try again.'}`)
        setLoading(false)
      }
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const handleUpdateAmount = (itemId: string, newAmount: string) => {
    if (newAmount === '') {
      const item = cart.find(i => i.id === itemId)
      if (item) {
        updateAmount(itemId, item.minimum_amount || 1000)
      }
      return
    }

    const amountInCents = Math.round(parseFloat(newAmount) * 100)
    const item = cart.find(i => i.id === itemId)
    
    if (!isNaN(amountInCents) && item) {
      updateAmount(itemId, amountInCents)
    }
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl 2xl:max-w-4xl bg-white rounded-2xl shadow-lg p-10 2xl:p-16 text-center border border-sage-200">
          <h1 className="text-4xl 2xl:text-5xl font-serif text-sage-900 mb-4 2xl:mb-6">Your Cart is Empty</h1>
          <p className="text-sage-700 text-lg 2xl:text-xl mb-8 2xl:mb-10">
            Browse our registry to find items you'd like to contribute to.
          </p>
          <Link
            href="/registry"
            className="inline-block px-8 py-3 2xl:px-10 2xl:py-4 text-base 2xl:text-lg bg-sage-700 text-white rounded-lg hover:bg-sage-800 transition-colors font-medium"
          >
            View Registry
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100 py-12 2xl:py-20 px-4 md:px-6 2xl:px-12">
      <div className="max-w-5xl 2xl:max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl 2xl:text-6xl font-serif text-sage-900 mb-8 2xl:mb-12 text-center">
          Your Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8 2xl:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 2xl:space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-6 2xl:p-8 shadow-sm border border-sage-200"
              >
                <div className="flex gap-4 2xl:gap-6">
                  {/* Image */}
                  {item.image_url && (
                    <div className="relative w-24 h-24 2xl:w-32 2xl:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-sage-50">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg 2xl:text-xl font-serif text-sage-900">
                        {item.title}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sage-600 hover:text-red-600 transition-colors ml-2"
                        aria-label="Remove item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 2xl:w-6 2xl:h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <p className="text-sm 2xl:text-base text-sage-600 mb-3 2xl:mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Amount Input */}
                    <div className="flex items-center gap-4 2xl:gap-6">
                      <div className="flex-1 max-w-xs">
                        <label className="block text-xs 2xl:text-sm text-sage-700 mb-1">
                          Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-700 2xl:text-lg">
                            $
                          </span>
                          <input
                            type="number"
                            min={(item.minimum_amount || 1000) / 100}
                            step="1"
                            value={(item.amount / 100).toString()}
                            onChange={(e) =>
                              handleUpdateAmount(item.id, e.target.value)
                            }
                            onBlur={(e) => {
                              const amountInCents = Math.round(parseFloat(e.target.value) * 100)
                              const minAmount = item.minimum_amount || 1000
                              if (isNaN(amountInCents) || amountInCents < minAmount) {
                                updateAmount(item.id, minAmount)
                              }
                            }}
                            className="w-full border-2 border-sage-200 rounded-lg py-2 pl-7 pr-3 2xl:py-3 2xl:pl-9 2xl:pr-4 text-sm 2xl:text-base focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs 2xl:text-sm text-sage-600">Suggested</p>
                        <p className="text-sm 2xl:text-base font-medium text-sage-800">
                          ${(item.price / 100).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm 2xl:text-base text-sage-600 hover:text-red-600 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 2xl:p-8 shadow-sm border border-sage-200 sticky top-24">
              <h2 className="text-2xl 2xl:text-3xl font-serif text-sage-900 mb-6 2xl:mb-8">
                Checkout
              </h2>

              <div className="space-y-4 2xl:space-y-6 mb-6 2xl:mb-8">
                <label className="block">
                  <span className="block text-sm 2xl:text-base text-sage-800 mb-2 font-medium">
                    Your name *
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full border-2 border-sage-200 rounded-lg p-3 2xl:p-4 text-sm 2xl:text-base focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                  />
                </label>

                <label className="block">
                  <span className="block text-sm 2xl:text-base text-sage-800 mb-2 font-medium">
                    Message (optional)
                  </span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Leave a message for the couple..."
                    rows={3}
                    className="w-full border-2 border-sage-200 rounded-lg p-3 2xl:p-4 text-sm 2xl:text-base focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                  />
                </label>
              </div>

              <div className="border-t border-sage-200 pt-4 2xl:pt-6 mb-6 2xl:mb-8">
                <div className="flex justify-between items-center mb-2 text-base 2xl:text-lg">
                  <span className="text-sage-700">Items ({cart.length})</span>
                  <span className="text-sage-900 font-medium">
                    ${(cartTotal / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg 2xl:text-xl font-serif">
                  <span className="text-sage-900">Total</span>
                  <span className="text-sage-900">
                    ${(cartTotal / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading || !name.trim()}
                className="w-full py-3 2xl:py-4 text-base 2xl:text-lg bg-sage-700 text-white rounded-lg hover:bg-sage-800 transition-colors disabled:bg-sage-300 disabled:cursor-not-allowed font-medium shadow-md"
              >
                {loading ? 'Processing...' : 'Complete Contribution'}
              </button>

              <Link
                href="/registry"
                className="block text-center text-sm 2xl:text-base text-sage-600 hover:text-sage-800 mt-4"
              >
                ← Continue Gifting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}