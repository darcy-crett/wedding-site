import { supabaseAdmin } from '@/lib/supabase'
import { BANK_DETAILS } from '@/lib/bank-details'

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ThankYouPage({ params }: PageProps) {
  const { id } = await params
  
  const { data: order } = await supabaseAdmin
    .from('orders')
    .select('*, registry_items(title)')
    .eq('id', id)
    .single()

  if (!order) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-stone-800 mb-4">Order not found</h1>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-stone-800 mb-3">Thank You ❤️</h1>
          <p className="text-stone-600">
            You've contributed to <strong className="text-stone-800">{order.registry_items.title}</strong>
          </p>
        </div>

        {/* Reference Number */}
        <div className="bg-stone-50 border-2 border-stone-200 rounded-lg p-6 mb-6 text-center">
          <p className="text-sm text-stone-600 mb-2 uppercase tracking-wide">Reference Number</p>
          <p className="text-3xl font-mono font-bold text-stone-800 tracking-wider">
            {order.reference_code}
          </p>
        </div>

        {/* Amount */}
        <div className="text-center mb-8">
          <p className="text-stone-600 mb-1">Amount to transfer</p>
          <p className="text-2xl font-serif text-stone-800">
            ${(order.amount / 100).toFixed(2)}
          </p>
        </div>

        {/* Bank Details */}
        <div className="border border-stone-200 rounded-lg p-6 mb-6">
          <p className="text-lg font-serif text-stone-800 mb-4">Bank Transfer Details</p>
          <div className="space-y-2 text-stone-700">
            <div className="flex justify-between">
              <span className="text-stone-600">Account name:</span>
              <span className="font-medium">{BANK_DETAILS.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">BSB:</span>
              <span className="font-medium">{BANK_DETAILS.bsb}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Account number:</span>
              <span className="font-medium">{BANK_DETAILS.account}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Bank:</span>
              <span className="font-medium">{BANK_DETAILS.bank}</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-900">
            <strong>Important:</strong> Please use the reference number <strong>{order.reference_code}</strong> exactly 
            as shown when completing your bank transfer so we can match your contribution.
          </p>
        </div>
      </div>
    </main>
  )
}