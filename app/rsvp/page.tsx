'use client'

import { useState } from 'react'

export default function RSVPPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transport, setTransport] = useState('')
  const [hasSpareSeats, setHasSpareSeats] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setSubmitted(true)
        form.reset()
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl 2xl:max-w-4xl bg-white rounded-2xl shadow-lg p-10 md:p-14 2xl:p-20 text-center border border-sage-200">
          <h1 className="text-5xl 2xl:text-6xl font-serif text-sage-900 mb-6 2xl:mb-8">Thank You!</h1>
          <p className="text-sage-700 text-lg 2xl:text-xl mb-10 2xl:mb-12 leading-relaxed">
            We've received your RSVP and can't wait to celebrate with you.
          </p>
          
          <a  href="/"
            className="inline-block px-10 py-4 2xl:px-12 2xl:py-5 text-lg 2xl:text-xl bg-sage-700 text-white rounded-lg hover:bg-sage-800 transition-colors font-medium shadow-md"
          >
            Back to Home
          </a>
        </div>
      </main>
    )
  }

  const showCarSharingQuestion = transport === 'driving-same-day' || transport === 'driving-staying'

  return (
    <main className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100 py-12 2xl:py-20 px-6 2xl:px-12">
      <div className="w-full max-w-2xl 2xl:max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10 md:p-12 2xl:p-16 border border-sage-200">
        <div className="text-center mb-10 2xl:mb-14">
          <h1 className="text-5xl 2xl:text-6xl font-serif text-sage-900 mb-4 2xl:mb-6">RSVP</h1>
          <p className="text-sage-700 text-lg 2xl:text-xl">
            Please respond by June 30, 2026
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7 2xl:space-y-10">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm 2xl:text-base font-medium text-sage-800 mb-2">
              Full Name(s) *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border-2 border-sage-200 rounded-lg p-3 2xl:p-4 text-base 2xl:text-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              placeholder="John and Jane Smith"
            />
          </div>

          {/* Attendance */}
          <div>
            <label className="block text-sm 2xl:text-base font-medium text-sage-800 mb-3 2xl:mb-4">
              Will you be attending? *
            </label>
            <div className="space-y-3">
              <label className="flex items-center p-4 2xl:p-5 border-2 border-sage-200 rounded-lg hover:bg-sage-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  required
                  className="mr-4 w-4 h-4 2xl:w-5 2xl:h-5 text-sage-700"
                />
                <span className="text-sage-800 font-medium text-base 2xl:text-lg">Joyfully accepts</span>
              </label>
              <label className="flex items-center p-4 2xl:p-5 border-2 border-sage-200 rounded-lg hover:bg-sage-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  className="mr-4 w-4 h-4 2xl:w-5 2xl:h-5 text-sage-700"
                />
                <span className="text-sage-800 font-medium text-base 2xl:text-lg">Regretfully declines</span>
              </label>
            </div>
          </div>

          {/* Dietary Requirements */}
          <div>
            <label htmlFor="dietary" className="block text-sm 2xl:text-base font-medium text-sage-800 mb-2">
              Dietary Requirements or Allergies
            </label>
            <textarea
              id="dietary"
              name="dietary"
              rows={3}
              className="w-full border-2 border-sage-200 rounded-lg p-3 2xl:p-4 text-base 2xl:text-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              placeholder="Please let us know of any dietary restrictions..."
            />
          </div>

          {/* Transport */}
          <div>
            <label className="block text-sm 2xl:text-base font-medium text-sage-800 mb-3 2xl:mb-4">
              How will you be getting to the wedding? *
            </label>
            <div className="space-y-3">
              <label className="flex items-center p-4 2xl:p-5 border-2 border-sage-200 rounded-lg hover:bg-sage-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="transport"
                  value="driving-same-day"
                  required
                  className="mr-4 w-4 h-4 2xl:w-5 2xl:h-5 text-sage-700"
                  onChange={(e) => setTransport(e.target.value)}
                />
                <span className="text-sage-800 text-base 2xl:text-lg">Driving down and back on the same day</span>
              </label>
              <label className="flex items-center p-4 2xl:p-5 border-2 border-sage-200 rounded-lg hover:bg-sage-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="transport"
                  value="driving-staying"
                  className="mr-4 w-4 h-4 2xl:w-5 2xl:h-5 text-sage-700"
                  onChange={(e) => setTransport(e.target.value)}
                />
                <span className="text-sage-800 text-base 2xl:text-lg">Driving down and staying nearby</span>
              </label>
              <label className="flex items-center p-4 2xl:p-5 border-2 border-sage-200 rounded-lg hover:bg-sage-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="transport"
                  value="taxi-rideshare"
                  className="mr-4 w-4 h-4 2xl:w-5 2xl:h-5 text-sage-700"
                  onChange={(e) => setTransport(e.target.value)}
                />
                <span className="text-sage-800 text-base 2xl:text-lg">Taxi/Rideshare</span>
              </label>
              <label className="flex items-center p-4 2xl:p-5 border-2 border-sage-200 rounded-lg hover:bg-sage-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="transport"
                  value="public-transport"
                  className="mr-4 w-4 h-4 2xl:w-5 2xl:h-5 text-sage-700"
                  onChange={(e) => setTransport(e.target.value)}
                />
                <span className="text-sage-800 text-base 2xl:text-lg">Public transport</span>
              </label>
            </div>
          </div>

          {/* Car Sharing - Only show if driving */}
          {showCarSharingQuestion && (
            <div className="bg-sage-100 border-2 border-sage-300 rounded-xl p-6 2xl:p-8">
              <label className="block text-sm 2xl:text-base font-medium text-sage-900 mb-4 2xl:mb-5">
                Do you have spare seats in your car and are happy to let people travel with you from the ceremony to the reception?
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-4 2xl:p-5 bg-white border-2 border-sage-200 rounded-lg hover:bg-sage-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="spare-seats"
                    value="yes"
                    className="mr-4 w-4 h-4 2xl:w-5 2xl:h-5 text-sage-700"
                    onChange={(e) => setHasSpareSeats(e.target.value)}
                  />
                  <span className="text-sage-800 font-medium text-base 2xl:text-lg">Yes</span>
                </label>
                <label className="flex items-center p-4 2xl:p-5 bg-white border-2 border-sage-200 rounded-lg hover:bg-sage-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="spare-seats"
                    value="no"
                    className="mr-4 w-4 h-4 2xl:w-5 2xl:h-5 text-sage-700"
                    onChange={(e) => setHasSpareSeats(e.target.value)}
                  />
                  <span className="text-sage-800 font-medium text-base 2xl:text-lg">No</span>
                </label>
              </div>

              {/* Number of spare seats - Only show if yes */}
              {hasSpareSeats === 'yes' && (
                <div className="mt-6 2xl:mt-8">
                  <label htmlFor="seats-available" className="block text-sm 2xl:text-base font-medium text-sage-900 mb-2">
                    How many spare seats do you have?
                  </label>
                  <select
                    id="seats-available"
                    name="seats-available"
                    className="w-full border-2 border-sage-200 rounded-lg p-3 2xl:p-4 text-base 2xl:text-lg bg-white focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="1">1 seat</option>
                    <option value="2">2 seats</option>
                    <option value="3">3 seats</option>
                    <option value="4">4 seats</option>
                    <option value="5+">5+ seats</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Bus Service Interest */}
          <div>
            <label className="block text-sm 2xl:text-base font-medium text-sage-800 mb-2">
              Would you be interested in an opt-in bus service from a central Melbourne location to the wedding and back?
            </label>
            <p className="text-sm 2xl:text-base text-sage-600 mb-4">
              Please note: This would cost each person $50-$80 depending on how many people opt in
            </p>
            <div className="space-y-3">
              <label className="flex items-center p-4 2xl:p-5 border-2 border-sage-200 rounded-lg hover:bg-sage-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="bus-interest"
                  value="yes"
                  className="mr-4 w-4 h-4 2xl:w-5 2xl:h-5 text-sage-700"
                />
                <span className="text-sage-800 font-medium text-base 2xl:text-lg">Yes, I'm interested</span>
              </label>
              <label className="flex items-center p-4 2xl:p-5 border-2 border-sage-200 rounded-lg hover:bg-sage-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="bus-interest"
                  value="no"
                  className="mr-4 w-4 h-4 2xl:w-5 2xl:h-5 text-sage-700"
                />
                <span className="text-sage-800 font-medium text-base 2xl:text-lg">No thanks</span>
              </label>
            </div>
          </div>

          {/* Song Request */}
          <div>
            <label htmlFor="song-request" className="block text-sm 2xl:text-base font-medium text-sage-800 mb-2">
              Song Request (optional)
            </label>
            <textarea
              id="song-request"
              name="song-request"
              rows={3}
              className="w-full border-2 border-sage-200 rounded-lg p-3 2xl:p-4 text-base 2xl:text-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              placeholder="Any songs you'd love to hear on the dance floor?"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 2xl:py-5 text-lg 2xl:text-xl bg-sage-700 text-white rounded-lg hover:bg-sage-800 transition-colors disabled:bg-sage-300 disabled:cursor-not-allowed font-medium shadow-md"
          >
            {loading ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </form>
      </div>
    </main>
  )
}