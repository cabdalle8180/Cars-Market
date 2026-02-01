import { Link } from "react-router-dom";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useState, useEffect } from "react";
import ListingItems from "../Components/ListingItems";

function HomePage() {
  SwiperCore.use([Navigation, Autoplay]);

  // states
  const [offerlisting, setofferlisting] = useState([]);
  const [rentlisting, setrentlisting] = useState([]);
  const [salelisting, setsalelisting] = useState([]);

  // fetch listings
  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`/api/listing/get?offer=true&limit=4`);
      const data = await res.json();
      setofferlisting(data);
    };
    const fetchRentListing = async () => {
      const res = await fetch(`/api/listing/get?type=rent&limit=4`);
      const data = await res.json();
      setrentlisting(data);
    };
    const fetchsaleListing = async () => {
      const res = await fetch(`/api/listing/get?type=sale&limit=4`);
      const data = await res.json();
      setsalelisting(data);
    };
    fetchsaleListing();
    fetchRentListing();
    fetchListing();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 lg:py-32">
          <div className="text-center space-y-6">
            {/* Badge */}
            <div className="inline-block animate-bounce">
              <span className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold shadow-lg">
                ✨ Your Trusted Car Partner
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white">
              Find Your Perfect
              <br />
              <span className="text-yellow-300">Dream Car</span> Today
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
              Welcome to <span className="font-bold text-white">IftiinSheCar</span> - where finding your ideal vehicle is simple,
              transparent, and exciting. Browse our curated collection of quality cars.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link
                to="/search"
                className="group px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Browse All Cars
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                to="/search?offer=true"
                className="px-8 py-4 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-300"
              >
                🔥 Special Offers
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 md:gap-12 max-w-4xl mx-auto pt-12 text-white">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold">500+</div>
                <div className="text-sm md:text-base text-blue-100 mt-2">Quality Vehicles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold">1.2K+</div>
                <div className="text-sm md:text-base text-blue-100 mt-2">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold">10+</div>
                <div className="text-sm md:text-base text-blue-100 mt-2">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 md:h-20">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Featured Carousel */}
      {offerlisting && offerlisting.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 -mt-8 md:-mt-12 mb-16 relative z-10">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            {offerlisting.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div className="relative h-[50vh] md:h-[60vh]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${listing.image[0]})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="max-w-7xl mx-auto">
                      <span className="inline-block px-4 py-1 bg-orange-500 text-white text-sm font-bold rounded-full mb-3">
                        SPECIAL OFFER
                      </span>
                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-3">{listing.name}</h3>
                      <Link
                        to={`/listing/${listing._id}`}
                        className="inline-block px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all shadow-lg"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Listings Sections */}
      <div className="max-w-7xl mx-auto px-6 pb-20 space-y-16">
        {/* Hot Offers Section */}
        <section className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">🔥</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Hot Offers
                </h2>
              </div>
              <p className="text-gray-600 text-lg">Limited-time deals you won't want to miss</p>
            </div>
            <Link
              to="/search?offer=true"
              className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 shadow-lg transform hover:scale-105 transition-all"
            >
              See All Offers →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerlisting.map((listing) => (
              <ListingItems listing={listing} key={listing._id} />
            ))}
          </div>
        </section>

        {/* Rentals Section */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">🚗</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Cars for Rent
                </h2>
              </div>
              <p className="text-gray-600 text-lg">Flexible rental options for every journey</p>
            </div>
            <Link
              to="/search?type=rent"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-lg transform hover:scale-105 transition-all"
            >
              View All Rentals →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rentlisting.map((listing) => (
              <ListingItems listing={listing} key={listing._id} />
            ))}
          </div>
        </section>

        {/* Sales Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">💎</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Cars for Sale
                </h2>
              </div>
              <p className="text-gray-600 text-lg">Own your dream car today</p>
            </div>
            <Link
              to="/search?type=sale"
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-lg transform hover:scale-105 transition-all"
            >
              Browse All Sales →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {salelisting.map((listing) => (
              <ListingItems listing={listing} key={listing._id} />
            ))}
          </div>
        </section>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of satisfied customers who found their perfect vehicle with IftiinSheAuto.
            Your dream car is just a click away!
          </p>
          <Link
            to="/search"
            className="inline-block px-10 py-5 bg-white text-blue-600 text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
          >
            Start Searching Now →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
