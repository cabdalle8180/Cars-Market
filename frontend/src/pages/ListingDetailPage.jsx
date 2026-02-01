
import React, { useEffect, useState } from "react";
import { FaMapMarkedAlt, FaMapMarkerAlt, FaShare, FaCar, FaCalendarAlt, FaTachometerAlt, FaGasPump, FaCog } from "react-icons/fa";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle"
// import "swiper/css";
// import "swiper/css/navigation";

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
  const [contct, setcontact]= useState (false)

     useEffect(() => {
    if (copied) {
      toast.success("Copied successfully!");
      const timer = setTimeout(() => setcopied(false), 2000); // reset after 2s
      return () => clearTimeout(timer); // cleanup
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
          // toast.error(data.message || "Failed to fetch listing");
          setError(data.message || "Failed to fetch listing");
          setLoading(false);
          return;
        }

        setListing(data);
        setLoading(false);
      } catch (error) {
        // toast.error("Failed to fetch listing");
        setError("Failed to fetch listing");
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, navigate]);

  console.log(listing);
  

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-gray-900 rounded-full">Loading...</div>
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

  // const isOwner =
  //   currentUser &&
  //   listing.salesREF &&
  //   currentUser._id === listing.salesREF.toString();


 console.log("listinPrice:",listing.price,"listingDiscount:", listing.discount);


  return (
   <main>
    {
      listing && !loading && !error && <div>
        <Swiper modules={[Navigation]} navigation>
          {
            listing.image.map((url)=>(
              <SwiperSlide key={url}>
                <div className="h-[75vh]" style={{background: `url(${url}) center no-repeat`, backgroundSize:"cover"}}></div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div className="fixed top-[13%] z-10 right-[3%] rounded-full border flex justify-center items-center w-12 h-12 bg-slate-100 cursor-pointer ">
          {/* <  FaShare onClick={()=> {navigator.clipboard.writeText(window.location.href); setcopied(true); setTimeout(()=>{setcopied(false)}),2000}}  className="text-slate-500"/>
          {copied && toast.success("copied successfull")} */}
              <FaShare
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setcopied(true);
        }}
        className="text-slate-500 text-xl"
      />
        </div>

        <div className="flex flex-col p-3 max-w-4xl mx-auto my-7 gap-4">
          
          <p className="text-2xl font-semibold">
            {/* {listing.name} ${" "}{listing.price ? Number(listing.price).toLocaleString("en-US") : "0"} */}

             {listing.name} ${" "}
  {listing.price 
    ? Number(listing.offer && listing.discount 
        ? listing.price - listing.discount 
        : listing.price
      ).toLocaleString("en-US")
    : "0"
  }

            {listing.type === "rent" && " /month"}
          </p>
         <p className=" flex items-center gap-2 text-sm text-slate-700 mt-6">
          <FaMapMarkerAlt className="text-green-700 "/>
           {
            listing.location 
          }
         </p>
         <div className="flex gap-4">
          <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md ">{listing.type === "rent" ? " For Rent" : "For Sale"}</p>
          {listing.offer && listing.discount && !isNaN(Number(listing.discount)) && (
            <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md ">
              Save:{Number(listing.discount).toLocaleString("en-US")}
            </p>
          )}
         </div>

         {/* Description Section */}
         {listing.description && (
           <div className="mt-6">
             <h2 className="text-xl font-semibold mb-3">Description</h2>
             <p className="text-gray-700 leading-relaxed">{listing.description}</p>
           </div>
         )}

         {/* Car Specifications */}
         <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
           {listing.model && (
             <div className="flex items-center gap-2">
               <FaCar className="text-gray-600" />
               <div>
                 <p className="text-xs text-gray-500">Model</p>
                 <p className="text-sm font-medium">{listing.model}</p>
               </div>
             </div>
           )}
           {listing.year && (
             <div className="flex items-center gap-2">
               <FaCalendarAlt className="text-gray-600" />
               <div>
                 <p className="text-xs text-gray-500">Year</p>
                 <p className="text-sm font-medium">{listing.year}</p>
               </div>
             </div>
           )}
           {listing.mileage !== undefined && listing.mileage !== null && (
             <div className="flex items-center gap-2">
               <FaTachometerAlt className="text-gray-600" />
               <div>
                 <p className="text-xs text-gray-500">Mileage</p>
                 <p className="text-sm font-medium">{listing.mileage.toLocaleString("en-US")}</p>
               </div>
             </div>
           )}
           {listing.fuelType && (
             <div className="flex items-center gap-2">
               <FaGasPump className="text-gray-600" />
               <div>
                 <p className="text-xs text-gray-500">Fuel</p>
                 <p className="text-sm font-medium">{listing.fuelType}</p>
               </div>
             </div>
           )}
           {listing.transmission && (
             <div className="flex items-center gap-2">
               <FaCog className="text-gray-600" />
               <div>
                 <p className="text-xs text-gray-500">Transmission</p>
                 <p className="text-sm font-medium">{listing.transmission}</p>
               </div>
             </div>
           )}
         </div>
         {
          currentUser && currentUser._id !== listing.salesREF && !contct &&(
            <button onClick={()=>setcontact(true)} className="p-3 bg-slate-600 text-white uppercase rounded-lg hover:opacity-95 cursor-pointer" >Contact Owner</button>
          )
         }
         {contct && <Contact listing={listing}/>}
        </div>


      </div>
    }
   <ToastContainer/>
   </main>
   
  );
}


export default ListingDetailPage;
