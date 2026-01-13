import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://mduhfpicobfaqgwhxtbp.supabase.co/storage/v1/object/public/hero-images/ducks_watercolour.png"
          alt="Watercolor ducks on lake"
          fill
          className="object-cover"
          priority
          quality={85}
        />
      </div>

      {/* Content with backdrop blur sections */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-stone-700 uppercase tracking-widest text-sm mb-4">
              Save Our Date
            </p>
            
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-stone-800 mb-6">
              Kaylah & Darcy
            </h1>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-stone-400"></div>
              <p className="text-stone-700 text-lg">
                November 14, 2026
              </p>
              <div className="h-px w-12 bg-stone-400"></div>
            </div>

            <p className="text-stone-700 text-lg mb-12 max-w-md mx-auto">
              Join us as we celebrate our wedding day in the gardens of Coolart Historic Homestead
            </p>
          </div>
        </section>

        {/* Details Section with frosted glass effect */}
        <section className="py-20 px-6 backdrop-blur-md bg-white/70">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Ceremony */}
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-sage-200">
                <h2 className="font-serif text-3xl text-sage-900 mb-4">Ceremony</h2>
                <p className="text-sage-700 mb-2 font-medium">3:00 PM arrival for a 3:30 PM start</p>
                <p className="text-sage-700 leading-relaxed">
                  Coolart Historic Homestead<br />
                  40 Lord Somers Rd<br />
                  Somers, 3927
                </p>
              </div>

              {/* Reception */}
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-sage-200">
                <h2 className="font-serif text-3xl text-sage-900 mb-4">Reception</h2>
                <p className="text-sage-700 mb-2 font-medium">6:00 PM</p>
                <p className="text-sage-700 leading-relaxed">
                  Merricks General Store<br />
                  3460 Frankston - Flinders Rd<br />
                  Merricks, 3916
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP CTA with frosted glass */}
        <section className="py-20 px-6 backdrop-blur-md bg-sage-100/80">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-4xl text-sage-900 mb-6">
              Will You Join Us?
            </h2>
            <p className="text-sage-700 mb-8 text-lg">
              We kindly request the pleasure of your response by June 30, 2026
            </p>
            <Link
              href="/rsvp"
              className="inline-block px-10 py-4 bg-sage-700 text-white rounded-lg hover:bg-sage-800 transition-colors shadow-md font-medium"
            >
              RSVP Now
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}