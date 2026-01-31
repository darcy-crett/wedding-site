import { supabaseAdmin } from '@/lib/supabase'
import { NextResponse } from 'next/server'

function generateReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'KD-'
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { registryItemId, name, message, amount } = body

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter a valid name (at least 2 characters)' },
        { status: 400 }
      )
    }

    // Validate amount
    if (!amount || typeof amount !== 'number' || amount < 1000) {
      return NextResponse.json(
        { error: 'Please enter a valid amount (minimum $10)' },
        { status: 400 }
      )
    }

    const { data: item, error: itemError } = await supabaseAdmin
      .from('registry_items')
      .select('*')
      .eq('id', registryItemId)
      .single()

    if (itemError || !item) {
      console.error('Item fetch error:', itemError)
      return NextResponse.json({ error: 'Invalid item' }, { status: 400 })
    }

    // Validate against minimum amount for this item
    if (amount < (item.minimum_amount || 1000)) {
      return NextResponse.json(
        { error: `Minimum contribution for this item is $${((item.minimum_amount || 1000) / 100).toFixed(0)}` },
        { status: 400 }
      )
    }

    const cleanName = name.trim()
    const cleanMessage = message?.trim() || null
    const reference = generateReference()

    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert({
        registry_item_id: item.id,
        amount: amount, // Use the custom amount
        reference_code: reference,
        purchaser_name: cleanName,
        purchaser_message: cleanMessage
      })
      .select()
      .single()

    if (error) {
      console.error('Order insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      orderId: data.id,
      reference: reference,
      amount: amount
    })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}