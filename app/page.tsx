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

        {/* Single continuous frosted glass panel */}
        <div className="backdrop-blur-md bg-white/60">

        {/* Details Section */}
        <section className="py-20 xl:py-32 px-6">
          <div className="max-w-6xl xl:max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 xl:gap-16 2xl:gap-24">
              {/* Ceremony */}
              <div className="text-center bg-white rounded-2xl p-8 xl:p-12 shadow-lg border border-sage-200">
                <h2 className="font-serif text-3xl xl:text-4xl text-sage-900 mb-4">Ceremony</h2>
                <p className="text-sage-700 mb-2 font-medium text-base xl:text-lg">3:00pm arrival for a 3:30pm start</p>
                <p className="text-sage-700 leading-relaxed text-base">
                  Coolart Historic Homestead<br />
                  40 Lord Somers Rd<br />
                  Somers, 3927
                </p>
              </div>

              {/* Reception */}
              <div className="text-center bg-white rounded-2xl p-8 xl:p-12 shadow-lg border border-sage-200">
                <h2 className="font-serif text-3xl xl:text-4xl text-sage-900 mb-4">Reception</h2>
                <p className="text-sage-700 mb-2 font-medium text-base xl:text-lg">6:00pm</p>
                <p className="text-sage-700 leading-relaxed text-base">
                  Merricks General Store<br />
                  3460 Frankston - Flinders Rd<br />
                  Merricks, 3916
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 xl:py-32 px-6">
          <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto">
            <h2 className="font-serif text-4xl xl:text-5xl 2xl:text-6xl text-sage-900 text-center mb-12 xl:mb-16 2xl:mb-20">
              Timeline of the Day
            </h2>

            {/* Mobile Timeline - Vertical */}
            <div className="md:hidden relative">
              {/* Single continuous vertical line, positioned at the horizontal centre of the w-14 circles */}
              <div className="absolute left-7 top-7 bottom-7 w-0.5 bg-sage-700" style={{transform: 'translateX(-50%)'}}></div>
              <div className="space-y-0">
              <div className="flex gap-4 items-center pb-8">
                <div className="shrink-0 w-14 h-14 rounded-full bg-sage-700 text-white flex items-center justify-center font-semibold shadow-md text-[11px] leading-none relative z-10">
                  3:00
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-serif text-sage-900 mb-1">Guest Arrival</h3>
                  <p className="text-sm text-sage-700">Find your seats and enjoy the gardens</p>
                </div>
              </div>

              <div className="flex gap-4 items-center pb-8">
                <div className="shrink-0 w-14 h-14 rounded-full bg-sage-700 text-white flex items-center justify-center font-semibold shadow-md text-[11px] leading-none relative z-10">
                  3:30
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-serif text-sage-900 mb-1">Ceremony</h3>
                  <p className="text-sm text-sage-700">We tie the knot!</p>
                </div>
              </div>

              <div className="flex gap-4 items-center pb-8">
                <div className="shrink-0 w-14 h-14 rounded-full bg-sage-700 text-white flex items-center justify-center font-semibold shadow-md text-[11px] leading-none relative z-10">
                  4:00
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-serif text-sage-900 mb-1">Cocktail Hour</h3>
                  <p className="text-sm text-sage-700">Drinks and nibbles on the lawn</p>
                </div>
              </div>

              <div className="flex gap-4 items-center pb-8">
                <div className="shrink-0 w-14 h-14 rounded-full bg-sage-700 text-white flex items-center justify-center font-semibold shadow-md text-[11px] leading-none relative z-10">
                  5:45
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-serif text-sage-900 mb-1">Head to Reception</h3>
                  <p className="text-sm text-sage-700">15 minute drive to Merricks General Store</p>
                </div>
              </div>

              <div className="flex gap-4 items-center pb-8">
                <div className="shrink-0 w-14 h-14 rounded-full bg-sage-700 text-white flex items-center justify-center font-semibold shadow-md text-[11px] leading-none relative z-10">
                  6:00
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-serif text-sage-900 mb-1">Reception</h3>
                  <p className="text-sm text-sage-700">Dinner, speeches, celebrations & dancing!</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="shrink-0 w-14 h-14 rounded-full bg-sage-700 text-white flex items-center justify-center font-semibold shadow-md text-[11px] leading-none relative z-10">
                  11:00
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-serif text-sage-900 mb-1">Close</h3>
                  <p className="text-sm text-sage-700">Thank you for celebrating with us!</p>
                </div>
              </div>
              </div>
            </div>

            {/* Desktop Timeline - Horizontal */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute top-8 xl:top-10 2xl:top-12 left-0 right-0 h-0.5 bg-sage-700"></div>

                {/* Timeline events */}
                <div className="grid grid-cols-6 gap-4 xl:gap-6">
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 rounded-full bg-sage-700 text-white flex items-center justify-center font-semibold shadow-lg text-sm xl:text-base 2xl:text-lg">
                        3:00
                      </div>
                    </div>
                    <h3 className="text-base xl:text-lg 2xl:text-xl font-serif text-sage-900 mb-2">Guest Arrival</h3>
                    <p className="text-xs xl:text-sm 2xl:text-base text-sage-700">Find your seats and enjoy the gardens</p>
                  </div>

                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 rounded-full bg-sage-700 text-white flex items-center justify-center font-semibold shadow-lg text-sm xl:text-base 2xl:text-lg">
                        3:30
                      </div>
                    </div>
                    <h3 className="text-base xl:text-lg 2xl:text-xl font-serif text-sage-900 mb-2">Ceremony</h3>
                    <p className="text-xs xl:text-sm 2xl:text-base text-sage-700">We tie the knot!</p>
                  </div>

                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 rounded-full bg-sage-700 text-white flex items-center justify-center font-semibold shadow-lg text-sm xl:text-base 2xl:text-lg">
                        4:00
                      </div>
                    </div>
                    <h3 className="text-base xl:text-lg 2xl:text-xl font-serif text-sage-900 mb-2">Cocktail Hour</h3>
                    <p className="text-xs xl:text-sm 2xl:text-base text-sage-700">Drinks and nibbles on the lawn</p>
                  </div>

                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 rounded-full bg-sage-700 text-white flex items-center justify-center font-semibold shadow-lg text-sm xl:text-base 2xl:text-lg">
                        5:45
                      </div>
                    </div>
                    <h3 className="text-base xl:text-lg 2xl:text-xl font-serif text-sage-900 mb-2">Head to Reception</h3>
                    <p className="text-xs xl:text-sm 2xl:text-base text-sage-700">15 minute drive to Merricks General Store</p>
                  </div>

                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 rounded-full bg-sage-700 text-white flex items-center justify-center font-semibold shadow-lg text-sm xl:text-base 2xl:text-lg">
                        6:00
                      </div>
                    </div>
                    <h3 className="text-base xl:text-lg 2xl:text-xl font-serif text-sage-900 mb-2">Reception</h3>
                    <p className="text-xs xl:text-sm 2xl:text-base text-sage-700">Dinner, speeches, celebrations & dancing!</p>
                  </div>

                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 rounded-full bg-sage-700 text-white flex items-center justify-center font-semibold shadow-lg text-sm xl:text-base 2xl:text-lg">
                        11:00
                      </div>
                    </div>
                    <h3 className="text-base xl:text-lg 2xl:text-xl font-serif text-sage-900 mb-2">Close</h3>
                    <p className="text-xs xl:text-sm 2xl:text-base text-sage-700">Thank you for celebrating!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 xl:py-32 px-6">
          <div className="max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl xl:text-5xl 2xl:text-6xl text-sage-900 text-center mb-12 xl:mb-16 2xl:mb-20">
              Our Story
            </h2>

            <div className="space-y-12 xl:space-y-16 2xl:space-y-20">
              {/* Chapter 1: How We Met */}
              <div className="bg-white rounded-2xl p-8 xl:p-12 2xl:p-16 shadow-sm border border-sage-200 text-center">
                <h3 className="font-serif text-2xl xl:text-3xl 2xl:text-4xl text-sage-900 mb-4 xl:mb-6">
                  The Basketball Court
                </h3>
                <p className="text-sage-700 text-base xl:text-lg 2xl:text-xl leading-relaxed mb-4">
                  Like all great love stories, ours started... on a basketball court. Although, it's not too surprising given both our heights!
                </p>
                <p className="text-sage-700 text-base xl:text-lg 2xl:text-xl leading-relaxed">
                  It wasn't love at first sight, but it was friendship at first sight (Or at least as much friendship as Darcy could manage when Kaylah was too shy to talk to him). For a year, our conversations were mostly distanced waves and the occasional "Bye Darcy" and "Bye Kaylah."
                </p>
              </div>

              {/* Chapter 2: Growing Closer */}
              <div className="bg-white rounded-2xl p-8 xl:p-12 2xl:p-16 shadow-sm border border-sage-200 text-center">
                <h3 className="font-serif text-2xl xl:text-3xl 2xl:text-4xl text-sage-900 mb-4 xl:mb-6">
                  The First Date
                </h3>
                <p className="text-sage-700 text-base xl:text-lg 2xl:text-xl leading-relaxed mb-4">
                  Then in 2019, we finally started talking more, laughing more and growing closer. Our first official date was a walk through the Royal Botanical Gardens and the conversation flowed easily that day.
                </p>
                <p className="text-sage-700 text-base xl:text-lg 2xl:text-xl leading-relaxed">
                  By our 'technical' third date, July 8th, 2020, Darcy asked, "Do you want to be official?" Kaylah, very confused, replied, "What do you mean by that?" When Darcy clarified, "Like… boyfriend and girlfriend," she blurted out, "Ohhh, I thought you meant officially kissing or something haha! Yeah, I'd like that!" Darcy laughed and that was the start of us.
                </p>
              </div>

              {/* Chapter 3: Adventures Together */}
              <div className="bg-white rounded-2xl p-8 xl:p-12 2xl:p-16 shadow-sm border border-sage-200 text-center">
                <h3 className="font-serif text-2xl xl:text-3xl 2xl:text-4xl text-sage-900 mb-4 xl:mb-6">
                  Adventures Around the World
                </h3>
                <p className="text-sage-700 text-base xl:text-lg 2xl:text-xl leading-relaxed">
                  Since then, there have been countless basketball games, donuts, Thai takeaways, and adventures - including our six-month trip around the world in 2023: 182 days, 24 countries and 63,600 km… and even more memories than we can count.
                </p>
              </div>

              {/* Chapter 4: The Proposal */}
              <div className="bg-sage-50 rounded-2xl p-8 xl:p-12 2xl:p-16 shadow-sm border-2 border-sage-300 text-center">
                <h3 className="font-serif text-2xl xl:text-3xl 2xl:text-4xl text-sage-900 mb-4 xl:mb-6">
                  The Proposal 💍
                </h3>
                <p className="text-sage-700 text-base xl:text-lg 2xl:text-xl leading-relaxed mb-4">
                  By the end of 2024, Darcy knew what he wanted to do next. The plan was set: a proposal in Japan, in April 2025, during the one magical week when Mt. Fuji AND the cherry blossoms would be visible together.
                </p>
                <p className="text-sage-700 text-base xl:text-lg 2xl:text-xl leading-relaxed mb-4">
                  (Seeing both at their peak is rare. The cherry blossoms bloom for only one week each year, and Mt. Fuji is famously shy, visible just 20–30% of the time. Darcy checked all the forecasts, bloom maps, and weather charts.)
                </p>
                <p className="text-sage-700 text-base xl:text-lg 2xl:text-xl leading-relaxed mb-4">
                  We rode bikes through the quiet lakeside, pink petals floating around us, and Darcy knew exactly the spot. But Kaylah kept turning to look at him making it very difficult for him to secretly get the ring out of his bag.
                </p>
                <p className="text-sage-700 text-base xl:text-lg 2xl:text-xl leading-relaxed mb-4">
                  "Hey, look at that dog!" he said trying to create a distraction. Kaylah looked, smiled, and turned right back to him. Darcy, hand halfway to the bag, quickly pretended to adjust his jacket. Next attempt: "Oh, look at the mountain!" Kaylah turned, admired, and turned right back to him. "Do you... want some water?" Kaylah nodded, completely oblivious. As she drank, Darcy finally seized the moment stealthily moving the ring from his bag to his pocket. Success!
                </p>
                <p className="text-sage-700 text-base xl:text-lg 2xl:text-xl leading-relaxed">
                  Then under the cherry blossoms in Japan with Mt. Fuji in full view, Darcy got down on one knee and asked the question. And of course Kaylah said yes. 💍
                </p>
              </div>

              {/* Chapter 5: What's Next */}
              <div className="bg-white rounded-2xl p-8 xl:p-12 2xl:p-16 shadow-sm border border-sage-200 text-center">
                <p className="text-sage-700 text-lg xl:text-xl 2xl:text-2xl leading-relaxed font-medium">
                  And now, here we are, ready for our next great adventure: Getting married. November 14th, 2026.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP CTA */}
        <section className="py-20 xl:py-32 px-6">
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

        </div>{/* end continuous frosted glass panel */}
      </div>
    </main>
  )
}