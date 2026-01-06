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
      <main className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-3xl mb-6">Order not found</h1>
      </main>
    )
  }

  return (
    <main className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl mb-6">Thank you ❤️</h1>

      <p className="mb-4">
        You've contributed to <strong>{order.registry_items.title}</strong>
      </p>

      <div className="border rounded-lg p-6 mb-6">
        <p className="text-sm mb-2">Reference number</p>
        <p className="text-2xl font-mono">{order.reference_code}</p>
      </div>

      <p className="mb-4">
        Amount: ${(order.amount / 100).toFixed(2)}
      </p>

      <div className="border rounded-lg p-6 text-left">
        <p className="mb-2 font-medium">Bank transfer details</p>
        <p>Account name: {BANK_DETAILS.name}</p>
        <p>BSB: {BANK_DETAILS.bsb}</p>
        <p>Account number: {BANK_DETAILS.account}</p>
      </div>

      <p className="text-sm text-neutral-600 mt-4">
        Please use the reference exactly as shown when completing your bank transfer.
      </p>
    </main>
  )
}