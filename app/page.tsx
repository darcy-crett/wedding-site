import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://mduhfpicobfaqgwhxtbp.supabase.co/storage/v1/object/public/hero-images/ducks_watercolour2.jpg"
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
        <section className="h-screen flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-white uppercase tracking-widest text-sm md:text-base mb-4 drop-shadow-md font-semibold">
              Welcome to the wedding of
            </p>
            
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl text-white mb-6 drop-shadow-lg">
              Kaylah & Darcy
            </h1>
            
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-px w-16 xl:w-24 bg-white/70"></div>
              <p className="text-white text-lg md:text-xl xl:text-2xl drop-shadow-md font-semibold">
                Saturday, 14th November 2026
              </p>
              <div className="h-px w-16 xl:w-24 bg-white/70"></div>
            </div>
          </div>
        </section>

        {/* Details Section with frosted glass effect */}
        <section className="py-20 xl:py-32 px-6 backdrop-blur-md bg-white/70">
          <div className="max-w-6xl xl:max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 xl:gap-16 2xl:gap-24">
              {/* Ceremony */}
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 xl:p-12 shadow-lg border border-sage-200">
                <h2 className="font-serif text-3xl xl:text-4xl text-sage-900 mb-4">Ceremony</h2>
                <p className="text-sage-700 mb-2 font-medium text-base xl:text-lg">3:00 PM arrival for a 3:30 PM start</p>
                <p className="text-sage-700 leading-relaxed text-base">
                  Coolart Historic Homestead<br />
                  40 Lord Somers Rd<br />
                  Somers, 3927
                </p>
              </div>

              {/* Reception */}
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 xl:p-12 shadow-lg border border-sage-200">
                <h2 className="font-serif text-3xl xl:text-4xl text-sage-900 mb-4">Reception</h2>
                <p className="text-sage-700 mb-2 font-medium text-base xl:text-lg">6:00 PM</p>
                <p className="text-sage-700 leading-relaxed text-base">
                  Merricks General Store<br />
                  3460 Frankston - Flinders Rd<br />
                  Merricks, 3916
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP CTA with frosted glass */}
        <section className="py-20 xl:py-32 px-6 backdrop-blur-md bg-sage-100/80">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl xl:text-5xl text-sage-900 mb-6">
              Will You Join Us?
            </h2>
            <p className="text-sage-700 mb-8 text-lg xl:text-xl">
              We kindly request the pleasure of your response by June 30, 2026
            </p>
            <Link
              href="/rsvp"
              className="inline-block px-12 py-4 text-base xl:text-lg bg-sage-700 text-white rounded-lg hover:bg-sage-800 transition-colors shadow-md font-medium"
            >
              RSVP Now
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}