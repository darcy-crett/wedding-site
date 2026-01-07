import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-sage-100 to-stone-50">
        <div className="text-center px-6">
          <p className="text-stone-600 uppercase tracking-widest text-sm mb-4">
            Save Our Date
          </p>
          
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-stone-800 mb-6">
            Kaylah & Darcy
          </h1>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-stone-300"></div>
            <p className="text-stone-600 text-lg">
              November 14, 2026
            </p>
            <div className="h-px w-12 bg-stone-300"></div>
          </div>

          <p className="text-stone-600 text-lg mb-12 max-w-md mx-auto">
            Join us as we celebrate our wedding day in the gardens of Coolart Historic Homestead
          </p>

          <Link
            href="/registry"
            className="inline-block px-8 py-3 bg-stone-800 text-white rounded-md hover:bg-stone-700 transition-colors"
          >
            View Our Registry
          </Link>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Ceremony */}
            <div className="text-center">
              <h2 className="font-serif text-3xl text-stone-800 mb-4">Ceremony</h2>
              <p className="text-stone-600 mb-2">3:00 PM arrival for a 3:30 PM start</p>
              <p className="text-stone-600">
                Coolart Historic Homestead<br />
                40 Lord Somers Rd<br />
                Somers, 3927
              </p>
            </div>

            {/* Reception */}
            <div className="text-center">
              <h2 className="font-serif text-3xl text-stone-800 mb-4">Reception</h2>
              <p className="text-stone-600 mb-2">6:00 PM</p>
              <p className="text-stone-600">
                Merricks General Store<br />
                3460 Frankston - Flinders Rd<br />
                Merricks, 3916
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-stone-800 mb-6">
            Will You Join Us?
          </h2>
          <p className="text-stone-600 mb-8">
            We kindly request the pleasure of your response by January 15, 2026
          </p>
          <Link
            href="/rsvp"
            className="inline-block px-8 py-3 bg-stone-800 text-white rounded-md hover:bg-stone-700 transition-colors"
          >
            RSVP Now
          </Link>
        </div>
      </section>
    </main>
  )
}