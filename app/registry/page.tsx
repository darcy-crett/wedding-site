import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

export default async function RegistryPage() {
  const { data: items } = await supabaseAdmin
    .from('registry_items')
    .select('*')
    .eq('is_active', true)
    .order('price', { ascending: true })

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-3">
            Our Registry
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Your presence at our wedding is the greatest gift of all. If you wish to contribute 
            to our honeymoon or future together, we would be truly grateful.
          </p>
        </div>
      </div>

      {/* Registry Items Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items?.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              {item.image_url && (
                <div className="relative h-64 bg-stone-100">
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
                <h2 className="text-xl font-serif text-stone-800 mb-2">
                  {item.title}
                </h2>
                <p className="text-stone-600 text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>
                
                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-serif text-stone-800">
                    ${(item.price / 100).toFixed(2)}
                  </span>
                  <Link
                    href={`/registry/${item.id}`}
                    className="px-6 py-2 bg-stone-800 text-white rounded-md hover:bg-stone-700 transition-colors text-sm"
                  >
                    Contribute
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!items || items.length === 0) && (
          <div className="text-center py-12">
            <p className="text-stone-500">No registry items available at this time.</p>
          </div>
        )}
      </div>
    </main>
  )
}