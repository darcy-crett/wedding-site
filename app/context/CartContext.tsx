'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type CartItem = {
  id: string
  title: string
  description: string
  price: number
  minimum_amount: number
  image_url?: string
  amount: number // Custom amount user wants to contribute
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateAmount: (itemId: string, amount: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('wedding-cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to load cart:', e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wedding-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      // Check if item already in cart
      const existingItem = prevCart.find(i => i.id === item.id)
      if (existingItem) {
        // Update the amount instead of adding duplicate
        return prevCart.map(i =>
          i.id === item.id ? { ...i, amount: item.amount } : i
        )
      }
      return [...prevCart, item]
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId))
  }

  const updateAmount = (itemId: string, amount: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, amount } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('wedding-cart')
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.amount, 0)
  const cartCount = cart.length

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateAmount,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}