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
    const { name, message, items } = body

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter a valid name (at least 2 characters)' },
        { status: 400 }
      )
    }

    // Validate items array
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0)

    if (totalAmount < 1000) {
      return NextResponse.json(
        { error: 'Minimum total contribution is $10' },
        { status: 400 }
      )
    }

    const cleanName = name.trim()
    const cleanMessage = message?.trim() || null
    const reference = generateReference()

    // Create the order
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        amount: totalAmount, // Keep for backwards compatibility
        total_amount: totalAmount,
        reference_code: reference,
        purchaser_name: cleanName,
        purchaser_message: cleanMessage,
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order insert error:', orderError)
      return NextResponse.json({ error: orderError.message }, { status: 500 })
    }

    // Create order_items entries
    const orderItems = items.map(item => ({
      order_id: order.id,
      registry_item_id: item.registryItemId,
      amount: item.amount,
    }))

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Order items insert error:', itemsError)
      // If order items fail, we should probably delete the order too
      await supabaseAdmin.from('orders').delete().eq('id', order.id)
      return NextResponse.json({ error: itemsError.message }, { status: 500 })
    }

    return NextResponse.json({
      orderId: order.id,
      reference: reference,
      amount: totalAmount,
    })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}