
import React, { useEffect, useState } from "react";
import { FaMapMarkedAlt, FaMapMarkerAlt, FaShare, FaCar, FaCalendarAlt, FaTachometerAlt, FaGasPump, FaCog } from "react-icons/fa";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle"
import { useAppContext } from "../Context/AppContex";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Swiper, SwiperSlide } from "swiper/react";
import Contact from "../Components/Contact";

function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAppContext();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setcopied] = useState(null);
  const [contct, setcontact] = useState(false)

  useEffect(() => {
    if (copied) {
      toast.success("Copied successfully!");
      const timer = setTimeout(() => setcopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    if (!id) {
      toast.error("Invalid listing ID");
      navigate("/");
      return;
    }

    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${id}`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch listing");
          setLoading(false);
          return;
        }

        setListing(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch listing");
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-slate-700 rounded-full"></div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">{error || "Listing not found"}</p>
        <Link to="/" className="text-blue-600 underline">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <main>
      {listing && !loading && !error && (
        <div>
          <div className="relative">
            <Swiper modules={[Navigation]} navigation className="z-0">
              {listing.image.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[40vh] md:h-[65vh] w-full bg-slate-200"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover"
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Share Button (Absolute within relative container) */}
            <div className="absolute top-4 right-4 z-10 rounded-full border bg-white/80 w-10 h-10 md:w-12 md:h-12 flex justify-center items-center cursor-pointer hover:bg-white transition shadow-md">
              <FaShare
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setcopied(true);
                }}
                className="text-slate-500 text-lg md:text-xl"
              />
            </div>
          </div>

          <div className="flex flex-col p-4 max-w-5xl mx-auto my-7 gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-2xl md:text-4xl font-bold capitalize text-slate-800">
                {listing.name}
              </p>
              <p className="text-xl md:text-2xl font-semibold text-slate-600">
                ${listing.price
                  ? Number(listing.offer && listing.discount
                    ? listing.price - listing.discount
                    : listing.price
                  ).toLocaleString("en-US")
                  : "0"
                }
                <span className="text-sm font-normal text-slate-500">{listing.type === "rent" ? " /month" : ""}</span>
              </p>
            </div>

            <p className="flex items-center gap-2 text-sm md:text-base text-slate-600">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.location}
            </p>

            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-2 rounded-lg font-semibold shadow-sm">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && listing.discount && !isNaN(Number(listing.discount)) && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-2 rounded-lg font-semibold shadow-sm">
                  Save ${Number(listing.discount).toLocaleString("en-US")}
                </p>
              )}
            </div>

            {/* Description Section */}
            {listing.description && (
              <div className="mt-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h2 className="text-xl font-semibold mb-3 text-slate-800">Description</h2>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">{listing.description}</p>
              </div>
            )}

            {/* Car Specifications */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              {listing.model && (
                <div className="flex items-center gap-3 p-3 bg-white border rounded-xl shadow-sm">
                  <FaCar className="text-slate-600 text-lg" />
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Model</p>
                    <p className="text-sm font-medium truncate">{listing.model}</p>
                  </div>
                </div>
              )}
              {listing.year && (
                <div className="flex items-center gap-3 p-3 bg-white border rounded-xl shadow-sm">
                  <FaCalendarAlt className="text-slate-600 text-lg" />
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Year</p>
                    <p className="text-sm font-medium truncate">{listing.year}</p>
                  </div>
                </div>
              )}
              {listing.mileage !== undefined && listing.mileage !== null && (
                <div className="flex items-center gap-3 p-3 bg-white border rounded-xl shadow-sm">
                  <FaTachometerAlt className="text-slate-600 text-lg" />
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Mileage</p>
                    <p className="text-sm font-medium truncate">{listing.mileage.toLocaleString("en-US")} km</p>
                  </div>
                </div>
              )}
              {listing.fuelType && (
                <div className="flex items-center gap-3 p-3 bg-white border rounded-xl shadow-sm">
                  <FaGasPump className="text-slate-600 text-lg" />
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Fuel</p>
                    <p className="text-sm font-medium truncate">{listing.fuelType}</p>
                  </div>
                </div>
              )}
              {listing.transmission && (
                <div className="flex items-center gap-3 p-3 bg-white border rounded-xl shadow-sm">
                  <FaCog className="text-slate-600 text-lg" />
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Trans</p>
                    <p className="text-sm font-medium truncate">{listing.transmission}</p>
                  </div>
                </div>
              )}
            </div>

            {currentUser && currentUser._id !== listing.salesREF && !contct && (
              <button onClick={() => setcontact(true)} className="w-full bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 transition-all shadow-lg font-semibold mt-4">
                Contact Owner
              </button>
            )}

            {contct && (
              <div className="bg-slate-50 p-4 rounded-xl border animate-fade-in">
                <Contact listing={listing} />
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </main>
  );
}

export default ListingDetailPage;
