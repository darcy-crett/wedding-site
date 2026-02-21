import Image from 'next/image'
import Link from 'next/link'

export default function DetailsPage() {
  return (
    <main className="min-h-screen">
      {/* Ceremony Section - Image left, text right */}
      <section className="relative min-h-screen flex items-center py-24 px-4 md:px-8">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://mduhfpicobfaqgwhxtbp.supabase.co/storage/v1/object/public/hero-images/coolart_watercolour_small.png"
            alt="Coolart Historic Homestead"
            fill
            className="object-cover object-left md:object-center"
            priority
            quality={85}
          />
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-lg 2xl:max-w-3xl mx-auto md:ml-auto md:mr-8 lg:mr-16 2xl:mr-40">
            <div className="bg-white/50 md:bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 2xl:p-16 shadow-xl border border-sage-200">
              <h1 className="text-3xl md:text-4xl 2xl:text-6xl font-serif text-sage-900 mb-4 2xl:mb-8 drop-shadow-sm md:drop-shadow-none">
                Ceremony
              </h1>
              
              <div className="space-y-4 2xl:space-y-8">
                <div>
                  <h2 className="text-base 2xl:text-xl font-medium text-sage-900 mb-1 2xl:mb-2 drop-shadow-sm md:drop-shadow-none">When</h2>
                  <p className="text-sm 2xl:text-lg text-sage-900 md:text-sage-700 drop-shadow-sm md:drop-shadow-none">
                    Saturday, November 14, 2026<br />
                    3:00 PM arrival for a 3:30 PM start
                  </p>
                </div>

                <div>
                  <h2 className="text-base 2xl:text-xl font-medium text-sage-900 mb-1 2xl:mb-2 drop-shadow-sm md:drop-shadow-none">Where</h2>
                  <p className="text-sm 2xl:text-lg text-sage-900 md:text-sage-700 drop-shadow-sm md:drop-shadow-none">
                    Coolart Historic Homestead<br />
                    40 Lord Somers Rd<br />
                    Somers, VIC 3927
                  </p>
                </div>

                <div>
                  <h2 className="text-base 2xl:text-xl font-medium text-sage-900 mb-1 2xl:mb-2 drop-shadow-sm md:drop-shadow-none">What to Expect</h2>
                  <p className="text-sm 2xl:text-lg text-sage-900 md:text-sage-700 leading-relaxed drop-shadow-sm md:drop-shadow-none">
                    Join us in the beautiful gardens of Coolart Historic Homestead for an outdoor ceremony. 
                    Please arrive by 3:00 PM to find your seats before the 3:30 PM start.
                    Join us afterwards for a drink on the lawn.
                  </p>
                </div>

                <div>
                  <h2 className="text-base 2xl:text-xl font-medium text-sage-900 mb-1 2xl:mb-2 drop-shadow-sm md:drop-shadow-none">Dress Code</h2>
                  <p className="text-sm 2xl:text-lg text-sage-900 md:text-sage-700 drop-shadow-sm md:drop-shadow-none">
                    Colourful garden formal - no black. For those wearing heels, we suggest avoiding stilettos or wearing stoppers as the ceremony will be on grass.
                  </p>
                </div>

                <div>
                  <h2 className="text-base 2xl:text-xl font-medium text-sage-900 mb-1 2xl:mb-2 drop-shadow-sm md:drop-shadow-none">Parking</h2>
                  <p className="text-sm 2xl:text-lg text-sage-900 md:text-sage-700 drop-shadow-sm md:drop-shadow-none">
                    Free parking is available on-site.
                  </p>
                </div>

                
                <a  href="https://www.google.com/maps/search/?api=1&query=Coolart+Historic+Homestead+40+Lord+Somers+Rd+Somers+VIC+3927"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2.5 2xl:px-8 2xl:py-4 bg-sage-700 text-white rounded-lg hover:bg-sage-800 transition-colors shadow-md font-medium text-sm 2xl:text-lg mt-2"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reception Section - Image right, text left */}
      <section className="relative min-h-screen flex items-center py-24 px-4 md:px-8">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://mduhfpicobfaqgwhxtbp.supabase.co/storage/v1/object/public/hero-images/merricks_watercolour_small.png"
            alt="Merricks General Store"
            fill
            className="object-cover object-right md:object-center"
            quality={85}
          />
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-lg 2xl:max-w-3xl mx-auto md:mr-auto md:ml-8 lg:ml-16 2xl:ml-40">
            <div className="bg-white/50 md:bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 2xl:p-16 shadow-xl border border-sage-200">
              <h1 className="text-3xl md:text-4xl 2xl:text-6xl font-serif text-sage-900 mb-4 2xl:mb-8 drop-shadow-sm md:drop-shadow-none">
                Reception
              </h1>
              
              <div className="space-y-4 2xl:space-y-8">
                <div>
                  <h2 className="text-base 2xl:text-xl font-medium text-sage-900 mb-1 2xl:mb-2 drop-shadow-sm md:drop-shadow-none">When</h2>
                  <p className="text-sm 2xl:text-lg text-sage-900 md:text-sage-700 drop-shadow-sm md:drop-shadow-none">
                    Saturday, November 14, 2026<br />
                    6:00 PM onwards
                  </p>
                </div>

                <div>
                  <h2 className="text-base 2xl:text-xl font-medium text-sage-900 mb-1 2xl:mb-2 drop-shadow-sm md:drop-shadow-none">Where</h2>
                  <p className="text-sm 2xl:text-lg text-sage-900 md:text-sage-700 drop-shadow-sm md:drop-shadow-none">
                    Merricks General Store<br />
                    3460 Frankston - Flinders Rd<br />
                    Merricks, VIC 3916
                  </p>
                </div>

                <div>
                  <h2 className="text-base 2xl:text-xl font-medium text-sage-900 mb-1 2xl:mb-2 drop-shadow-sm md:drop-shadow-none">What to Expect</h2>
                  <p className="text-sm 2xl:text-lg text-sage-900 md:text-sage-700 leading-relaxed drop-shadow-sm md:drop-shadow-none">
                    Following the ceremony, join us at Merricks General Store for drinks, dinner, and dancing. 
                    The evening will include bar service, a three-course meal, and plenty of time to celebrate.
                  </p>
                </div>

                <div>
                  <h2 className="text-base 2xl:text-xl font-medium text-sage-900 mb-1 2xl:mb-2 drop-shadow-sm md:drop-shadow-none">Getting There</h2>
                  <p className="text-sm 2xl:text-lg text-sage-900 md:text-sage-700 leading-relaxed drop-shadow-sm md:drop-shadow-none">
                    The reception venue is approximately 15 minutes from the ceremony. 
                    We recommend carpooling or arranging rideshare in advance.
                  </p>
                </div>

                <div>
                  <h2 className="text-base 2xl:text-xl font-medium text-sage-900 mb-1 2xl:mb-2 drop-shadow-sm md:drop-shadow-none">Parking</h2>
                  <p className="text-sm 2xl:text-lg text-sage-900 md:text-sage-700 drop-shadow-sm md:drop-shadow-none">
                    Free parking available on site.
                  </p>
                </div>

                
                <a  href="https://www.google.com/maps/search/?api=1&query=Merricks+General+Store+3460+Frankston+Flinders+Rd+Merricks+VIC+3916"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2.5 2xl:px-8 2xl:py-4 bg-sage-700 text-white rounded-lg hover:bg-sage-800 transition-colors shadow-md font-medium text-sm 2xl:text-lg mt-2"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 md:py-20 2xl:py-32 px-4 md:px-6 2xl:px-12 bg-gradient-to-b from-sage-50 to-sage-100">
        <div className="max-w-6xl 2xl:max-w-screen-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl 2xl:text-6xl font-serif text-sage-900 text-center mb-8 md:mb-12 2xl:mb-16">
            Additional Information
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 2xl:gap-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 2xl:p-10 shadow-sm border border-sage-200">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-serif text-sage-900 mb-3 2xl:mb-4">Accommodation</h3>
              <p className="text-sm 2xl:text-lg text-sage-700 leading-relaxed mb-3">
                There are several accommodation options in the area including hotels, motels, and Airbnbs in Mornington, Somers, and surrounding suburbs.
              </p>
              <p className="text-sm 2xl:text-lg text-sage-700 leading-relaxed">
                We recommend booking early as it's a popular area, especially during summer.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 2xl:p-10 shadow-sm border border-sage-200">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-serif text-sage-900 mb-3 2xl:mb-4">Weather</h3>
              <p className="text-sm 2xl:text-lg text-sage-700 leading-relaxed mb-3">
                November in Victoria can be warm and beautiful, but also unpredictable! The ceremony will be outdoors, so please come prepared for sun or possible showers.
              </p>
              <p className="text-sm 2xl:text-lg text-sage-700 leading-relaxed">
                We'll have a backup plan in case of rain.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 2xl:p-10 shadow-sm border border-sage-200">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-serif text-sage-900 mb-3 2xl:mb-4">Kids & +1s</h3>
              <p className="text-sm 2xl:text-lg text-sage-700 leading-relaxed">
                We would love to celebrate with everyone, however due to limited numbers we are only able to invite the guests named on the invitation. Sadly, this means no children or additional guests. We appreciate your understanding.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 2xl:p-10 shadow-sm border border-sage-200">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-serif text-sage-900 mb-3 2xl:mb-4">Questions?</h3>
              <p className="text-sm 2xl:text-lg text-sage-700 leading-relaxed mb-3">
                If you have any questions or concerns, please don't hesitate to reach out to us directly.
              </p>
              <Link
                href="/rsvp"
                className="text-sage-700 hover:text-sage-900 font-medium underline text-sm 2xl:text-lg"
              >
                Submit your RSVP →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}