import { supabase } from '@/lib/supabase'

export default async function RegistryPage() {
  const { data: items } = await supabase
    .from('registry_items')
    .select('*')
    .eq('is_active', true)
    .order('created_at')

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-serif mb-8">Our Registry</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {items?.map(item => (
          <div key={item.id} className="border rounded-lg p-6">
            <h2 className="text-xl mb-2">{item.title}</h2>
            <p className="text-sm text-neutral-600 mb-4">
              {item.description}
            </p>
            <p className="text-lg mb-4">
              ${(item.price / 100).toFixed(2)}
            </p>

            <a
              href={`/registry/${item.id}`}
              className="inline-block px-6 py-3 bg-neutral-900 text-white rounded"
            >
              Contribute
            </a>
          </div>
        ))}
      </div>
    </main>
  )
}
