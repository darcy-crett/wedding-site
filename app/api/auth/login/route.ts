import { NextResponse } from 'next/server'

const PASSWORD = process.env.SITE_PASSWORD || 'wedding2026'

export async function POST(req: Request) {
  console.log('Login API called')
  
  try {
    const { password } = await req.json()
    console.log('Password received, checking...')

    if (password === PASSWORD) {
      console.log('Password correct, setting cookie')
      const response = NextResponse.json({ success: true })
      
      // Set cookie that expires in 30 days
      response.cookies.set('wedding-auth', password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      console.log('Cookie set, returning response')
      return response
    }

    console.log('Password incorrect')
    return NextResponse.json({ success: false }, { status: 401 })
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json(
      { success: false, error: 'An error occurred' },
      { status: 500 }
    )
  }
}