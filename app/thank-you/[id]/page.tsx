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
    .select(`
      *,
      order_items (
        amount,
        registry_items (
          title,
          description
        )
      )
    `)
    .eq('id', id)
    .single()

  if (!order) {
    return (
      <main className="min-h-screen bg-sage-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-3xl 2xl:text-4xl font-serif text-sage-800 mb-4">Order not found</h1>
        </div>
      </main>
    )
  }

  const totalAmount = order.total_amount || order.amount

  return (
    <main className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100 flex items-center justify-center p-6 2xl:p-12">
      <div className="w-full max-w-2xl 2xl:max-w-4xl bg-white rounded-2xl shadow-lg p-10 md:p-14 2xl:p-20 border border-sage-200">
        <div className="text-center mb-10 2xl:mb-14">
          <h1 className="text-5xl 2xl:text-6xl font-serif text-sage-900 mb-4 2xl:mb-6">Thank You ❤️</h1>
          <p className="text-sage-700 text-lg 2xl:text-xl">
            We're so grateful for your generous gift!
          </p>
        </div>

        {/* Items Contributed */}
        {order.order_items && order.order_items.length > 0 && (
          <div className="mb-8 2xl:mb-12">
            <h2 className="text-xl 2xl:text-2xl font-serif text-sage-900 mb-4 2xl:mb-6">Your Contributions</h2>
            <div className="space-y-3 2xl:space-y-4">
              {order.order_items.map((orderItem: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-4 2xl:p-6 bg-sage-50 rounded-lg border border-sage-200"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sage-900 text-base 2xl:text-lg">
                      {orderItem.registry_items?.title}
                    </p>
                    {orderItem.registry_items?.description && (
                      <p className="text-sm 2xl:text-base text-sage-600 mt-1">
                        {orderItem.registry_items.description}
                      </p>
                    )}
                  </div>
                  <p className="text-sage-800 font-medium ml-4 text-base 2xl:text-lg">
                    ${(orderItem.amount / 100).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reference Number */}
        <div className="bg-sage-50 border-2 border-sage-300 rounded-xl p-8 2xl:p-12 mb-8 2xl:mb-12 text-center">
          <p className="text-sm 2xl:text-base text-sage-700 mb-3 uppercase tracking-wide font-medium">
            Reference Number
          </p>
          <p className="text-4xl 2xl:text-5xl font-mono font-bold text-sage-900 tracking-wider">
            {order.reference_code}
          </p>
        </div>

        {/* Amount */}
        <div className="text-center mb-10 2xl:mb-14">
          <p className="text-sage-700 mb-2 text-lg 2xl:text-xl">Total Amount to Transfer</p>
          <p className="text-3xl 2xl:text-4xl font-serif text-sage-900">
            ${(totalAmount / 100).toFixed(2)}
          </p>
        </div>

        {/* Bank Details */}
        <div className="border-2 border-sage-200 rounded-xl p-8 2xl:p-12 mb-8 2xl:mb-12 bg-sage-50/50">
          <p className="text-2xl 2xl:text-3xl font-serif text-sage-900 mb-6 2xl:mb-8">Bank Transfer Details</p>
          <div className="space-y-3 2xl:space-y-4 text-sage-800">
            <div className="flex justify-between text-base 2xl:text-lg">
              <span className="text-sage-700">Account name:</span>
              <span className="font-medium">{BANK_DETAILS.name}</span>
            </div>
            <div className="flex justify-between text-base 2xl:text-lg">
              <span className="text-sage-700">BSB:</span>
              <span className="font-medium">{BANK_DETAILS.bsb}</span>
            </div>
            <div className="flex justify-between text-base 2xl:text-lg">
              <span className="text-sage-700">Account number:</span>
              <span className="font-medium">{BANK_DETAILS.account}</span>
            </div>
            <div className="flex justify-between text-base 2xl:text-lg">
              <span className="text-sage-700">Bank:</span>
              <span className="font-medium">{BANK_DETAILS.bank}</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-sage-100 border-2 border-sage-300 rounded-xl p-6 2xl:p-8">
          <p className="text-sm 2xl:text-base text-sage-900 leading-relaxed">
            <strong>Important:</strong> Please use the reference number{' '}
            <strong className="font-mono text-base 2xl:text-lg">{order.reference_code}</strong> exactly as shown when
            completing your bank transfer so we can match your contribution.
          </p>
        </div>
      </div>
    </main>
  )
}