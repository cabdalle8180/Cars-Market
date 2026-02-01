import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              About <span className="text-yellow-300">IftiinSheCars</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in finding the perfect vehicle. We're committed to making car buying and renting simple, transparent, and enjoyable.
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 md:h-16">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Founded with a passion for exceptional service, IftiinSheAuto has grown to become a trusted name in the automotive marketplace. We understand that buying or renting a car is more than just a transaction—it's about finding the right vehicle that fits your lifestyle.
              </p>
              <p>
                With over 10 years of experience, we've helped thousands of customers find their dream vehicles. Our commitment to quality, transparency, and customer satisfaction sets us apart in the industry.
              </p>
              <p>
                Whether you're looking to buy your first car, upgrade to a luxury vehicle, or need a reliable rental for your next adventure, we're here to guide you every step of the way.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8 shadow-lg">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎯</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Our Mission</h3>
                  <p className="text-gray-600">
                    To make car buying and renting accessible, transparent, and stress-free for everyone.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-4xl">💎</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Our Vision</h3>
                  <p className="text-gray-600">
                    To be the most trusted and customer-centric automotive marketplace in the region.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Trust & Transparency</h3>
              <p className="text-gray-600">
                We believe in honest communication and full transparency. No hidden fees, no surprises—just straightforward service you can trust.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Quality First</h3>
              <p className="text-gray-600">
                Every vehicle in our inventory is carefully inspected and verified to ensure you get the highest quality and reliability.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Customer-Centric</h3>
              <p className="text-gray-600">
                Your satisfaction is our top priority. We go above and beyond to ensure you have an exceptional experience with us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose IftiinSheAuto?</h2>
          <p className="text-xl text-gray-600">We make your car journey seamless and enjoyable</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Wide Selection</h3>
            <p className="text-gray-600">500+ quality vehicles to choose from</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Verified Listings</h3>
            <p className="text-gray-600">All cars thoroughly inspected</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Competitive Pricing</h3>
            <p className="text-gray-600">Best deals in the market</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎧</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">24/7 Support</h3>
            <p className="text-gray-600">Always here to help you</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-xl text-blue-100">Numbers that speak for themselves</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-300 mb-2">500+</div>
              <div className="text-blue-100">Quality Vehicles</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-300 mb-2">1,200+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-300 mb-2">10+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-300 mb-2">98%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 text-center shadow-lg">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their dream vehicles with us. Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all"
            >
              Browse Vehicles →
            </Link>
            <Link
              to="/search?offer=true"
              className="px-8 py-4 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transform hover:scale-105 transition-all"
            >
              View Special Offers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;