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
      const response = await fetch('https://formspree.io/f/xpqwvwpv', {
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
      <main className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm p-8 md:p-12 text-center">
          <h1 className="text-4xl font-serif text-stone-800 mb-4">Thank You!</h1>
          <p className="text-stone-600 mb-8">
            We've received your RSVP and can't wait to celebrate with you.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-stone-800 text-white rounded-md hover:bg-stone-700 transition-colors">
          
            Back to Home
          </a>
        </div>
      </main>
    )
  }

  const showCarSharingQuestion = transport === 'driving-same-day' || transport === 'driving-staying'

  return (
    <main className="min-h-screen bg-stone-50 py-12 px-6">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-stone-800 mb-3">RSVP</h1>
          <p className="text-stone-600">
            Please respond by June 30, 2026
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
              Full Name(s) *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border border-stone-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
              placeholder="John and Jane Smith"
            />
          </div>

          {/* Attendance */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-3">
              Will you be attending? *
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  required
                  className="mr-3"
                />
                <span className="text-stone-700">Joyfully accepts</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  className="mr-3"
                />
                <span className="text-stone-700">Regretfully declines</span>
              </label>
            </div>
          </div>

          {/* Dietary Requirements */}
          <div>
            <label htmlFor="dietary" className="block text-sm font-medium text-stone-700 mb-2">
              Dietary Requirements or Allergies
            </label>
            <textarea
              id="dietary"
              name="dietary"
              rows={3}
              className="w-full border border-stone-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
              placeholder="Please let us know of any dietary restrictions..."
            />
          </div>

          {/* Transport */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-3">
              How will you be getting to the wedding? *
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="transport"
                  value="driving-same-day"
                  required
                  className="mr-3"
                  onChange={(e) => setTransport(e.target.value)}
                />
                <span className="text-stone-700">Driving down and back on the same day</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="transport"
                  value="driving-staying"
                  className="mr-3"
                  onChange={(e) => setTransport(e.target.value)}
                />
                <span className="text-stone-700">Driving down and staying nearby</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="transport"
                  value="taxi-rideshare"
                  className="mr-3"
                  onChange={(e) => setTransport(e.target.value)}
                />
                <span className="text-stone-700">Taxi/Rideshare</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="transport"
                  value="public-transport"
                  className="mr-3"
                  onChange={(e) => setTransport(e.target.value)}
                />
                <span className="text-stone-700">Public transport</span>
              </label>
            </div>
          </div>

          {/* Car Sharing - Only show if driving */}
          {showCarSharingQuestion && (
            <div className="bg-sage-50 border border-sage-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-stone-700 mb-3">
                Do you have spare seats in your car and are happy to let people travel with you from the ceremony to the reception?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="spare-seats"
                    value="yes"
                    className="mr-3"
                    onChange={(e) => setHasSpareSeats(e.target.value)}
                  />
                  <span className="text-stone-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="spare-seats"
                    value="no"
                    className="mr-3"
                    onChange={(e) => setHasSpareSeats(e.target.value)}
                  />
                  <span className="text-stone-700">No</span>
                </label>
              </div>

              {/* Number of spare seats - Only show if yes */}
              {hasSpareSeats === 'yes' && (
                <div className="mt-4">
                  <label htmlFor="seats-available" className="block text-sm font-medium text-stone-700 mb-2">
                    How many spare seats do you have?
                  </label>
                  <select
                    id="seats-available"
                    name="seats-available"
                    className="w-full border border-stone-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
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
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Would you be interested in an opt-in bus service from a central Melbourne location to the wedding and back? *
            </label>
            <p className="text-sm text-stone-500 mb-3">
              Please note: This would cost each person $50-$80 depending on how many people opt in
            </p>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bus-interest"
                  value="yes"
                  className="mr-3"
                  required
                />
                <span className="text-stone-700">Yes, I'm interested</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bus-interest"
                  value="no"
                  className="mr-3"
                />
                <span className="text-stone-700">No thanks</span>
              </label>
            </div>
          </div>

          {/* Song Request */}
          <div>
            <label htmlFor="song-request" className="block text-sm font-medium text-stone-700 mb-2">
              Song Request
            </label>
            <textarea
              id="song-request"
              name="song-request"
              rows={3}
              className="w-full border border-stone-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
              placeholder="Any songs you'd love to hear on the dance floor?"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-stone-800 text-white rounded-md hover:bg-stone-700 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </form>
      </div>
    </main>
  )
}