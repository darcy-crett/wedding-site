'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../context/CartContext'

export default function RegistryPage() {
  const [items, setItems] = useState<any[]>([])
  const { addToCart, cart } = useCart()
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch('/api/registry-items')
      const data = await res.json()
      setItems(data)
    }
    fetchItems()
  }, [])

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      minimum_amount: item.minimum_amount,
      image_url: item.image_url,
      amount: item.price, // Default to suggested price
    })
    
    // Show feedback
    setAddedItems(prev => new Set(prev).add(item.id))
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(item.id)
        return newSet
      })
    }, 2000)
  }

  const isInCart = (itemId: string) => cart.some(item => item.id === itemId)

  return (
    <main className="min-h-screen bg-sage-50">
      {/* Header */}
      <div className="bg-gradient-to-b from-sage-100 to-sage-50 border-b border-sage-200">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-sage-900 mb-4">
            Our Registry
          </h1>
          <p className="text-sage-700 max-w-2xl mx-auto text-lg leading-relaxed">
            Your presence at our wedding is the greatest gift of all. If you wish to contribute 
            to our honeymoon or future together, we would be truly grateful.
          </p>
        </div>
      </div>

      {/* Registry Items Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items?.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-sage-100 hover:border-sage-300"
            >
              {/* Image */}
              {item.image_url && (
                <div className="relative h-72 bg-sage-50">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-serif text-sage-900 mb-3">
                  {item.title}
                </h2>
                <p className="text-sage-700 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
                
                {/* Suggested Price and Buttons */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-sage-600">Suggested</span>
                      <p className="text-2xl font-serif text-sage-800">
                        ${(item.price / 100).toFixed(0)}+
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`flex-1 px-4 py-3 rounded-lg transition-all text-sm font-medium shadow-sm ${
                        addedItems.has(item.id)
                          ? 'bg-green-600 text-white'
                          : isInCart(item.id)
                          ? 'bg-sage-100 text-sage-800 border-2 border-sage-300'
                          : 'bg-sage-700 text-white hover:bg-sage-800'
                      }`}
                      disabled={addedItems.has(item.id)}
                    >
                      {addedItems.has(item.id) ? '✓ Added!' : isInCart(item.id) ? 'In Cart' : 'Add to Cart'}
                    </button>
                    
                    <Link
                      href={`/registry/${item.id}`}
                      className="px-4 py-3 bg-white border-2 border-sage-700 text-sage-700 rounded-lg hover:bg-sage-50 transition-colors text-sm font-medium shadow-sm"
                    >
                      Customize
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!items || items.length === 0) && (
          <div className="text-center py-16">
            <p className="text-sage-600 text-lg">No registry items available at this time.</p>
          </div>
        )}
      </div>
    </main>
  )
}