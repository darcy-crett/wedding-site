'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../context/CartContext'

export default function RegistryPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('popular')
  const { addToCart, cart } = useCart()
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function fetchItems() {
      setLoading(true)
      try {
        const res = await fetch(`/api/registry-items?sort=${sortBy}`)
        const data = await res.json()
        setItems(data)
      } catch (error) {
        console.error('Error fetching items:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [sortBy])

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      minimum_amount: item.minimum_amount,
      image_url: item.image_url,
      amount: item.price,
    })
    
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
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-6 2xl:px-12 py-16 2xl:py-24 text-center">
          <h1 className="text-5xl md:text-6xl 2xl:text-7xl font-serif text-sage-900 mb-4 2xl:mb-6">
            Our Registry
          </h1>
          <p className="text-sage-700 max-w-2xl 2xl:max-w-4xl mx-auto text-lg 2xl:text-xl leading-relaxed mb-8 2xl:mb-12">
            Your presence at our wedding is the greatest gift of all. If you wish to contribute 
            to our honeymoon or future together, we would be truly grateful.
          </p>

          {/* How It Works Section */}
          <div className="max-w-3xl 2xl:max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 2xl:p-12 shadow-sm border border-sage-200 text-left">
            <h2 className="text-2xl 2xl:text-3xl font-serif text-sage-900 mb-4 2xl:mb-6 text-center">How It Works</h2>
            
            <div className="space-y-4 2xl:space-y-6 text-sage-700 text-base 2xl:text-lg">
              <div className="flex gap-3 2xl:gap-4">
                <span className="flex-shrink-0 w-6 h-6 2xl:w-8 2xl:h-8 bg-sage-700 text-white rounded-full flex items-center justify-center text-sm 2xl:text-base font-medium">1</span>
                <p>Browse our registry and add items to your cart. Each item shows a suggested amount, but you can contribute any amount you're comfortable with (minimum $10).</p>
              </div>
              
              <div className="flex gap-3 2xl:gap-4">
                <span className="flex-shrink-0 w-6 h-6 2xl:w-8 2xl:h-8 bg-sage-700 text-white rounded-full flex items-center justify-center text-sm 2xl:text-base font-medium">2</span>
                <p>When you're ready, proceed to checkout where you'll provide your name and an optional message.</p>
              </div>
              
              <div className="flex gap-3 2xl:gap-4">
                <span className="flex-shrink-0 w-6 h-6 2xl:w-8 2xl:h-8 bg-sage-700 text-white rounded-full flex items-center justify-center text-sm 2xl:text-base font-medium">3</span>
                <p>You'll receive a unique reference code and bank transfer details. Complete the transfer at your convenience using the reference code so we can match your contribution.</p>
              </div>
            </div>

            <div className="mt-6 2xl:mt-8 pt-6 2xl:pt-8 border-t border-sage-200">
              <p className="text-sage-800 font-medium mb-2 text-base 2xl:text-lg">Prefer to give on the day?</p>
              <p className="text-sage-700 text-sm 2xl:text-base">
                We will also have a wishing well at the reception for those who prefer to give a card or gift in person. Whatever you choose, we're grateful for your generosity and love.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Registry Items Grid */}
      <div className="max-w-6xl 2xl:max-w-screen-2xl mx-auto px-6 2xl:px-12 py-16 2xl:py-24">
        {/* Sort Dropdown */}
        <div className="flex justify-end mb-8">
          <div className="relative">
            <label htmlFor="sort" className="sr-only">Sort by</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border-2 border-sage-200 rounded-lg px-4 py-2 pr-10 2xl:px-6 2xl:py-3 2xl:pr-12 text-sage-800 text-base 2xl:text-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 2xl:px-4 text-sage-700">
              <svg className="fill-current h-4 w-4 2xl:h-5 2xl:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 2xl:h-16 2xl:w-16 border-4 border-sage-200 border-t-sage-700"></div>
            <p className="text-sage-600 mt-4 text-lg 2xl:text-xl">Loading registry items...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sage-600 text-lg 2xl:text-xl">No registry items available at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 2xl:gap-10">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-sage-100 hover:border-sage-300"
              >
                {/* Image */}
                {item.image_url && (
                  <div className="relative h-72 2xl:h-80 bg-sage-50">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 2xl:p-8">
                  <h2 className="text-2xl 2xl:text-3xl font-serif text-sage-900 mb-3">
                    {item.title}
                  </h2>
                  <p className="text-sage-700 text-sm 2xl:text-base mb-6 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Suggested Price and Buttons */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm 2xl:text-base text-sage-600">Suggested</span>
                        <p className="text-2xl 2xl:text-3xl font-serif text-sage-800">
                          ${(item.price / 100).toFixed(0)}+
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`flex-1 px-4 py-3 2xl:px-5 2xl:py-4 rounded-lg transition-all text-sm 2xl:text-base font-medium shadow-sm ${
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
                        className="px-4 py-3 2xl:px-5 2xl:py-4 bg-white border-2 border-sage-700 text-sage-700 rounded-lg hover:bg-sage-50 transition-colors text-sm 2xl:text-base font-medium shadow-sm"
                      >
                        Customize
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}