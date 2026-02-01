// function ListingItems({ listing }) {
//   return (
//     <div className="border rounded-lg p-3">
//       <h2 className="font-semibold">{listing.name}</h2>
      
//     </div>
//   );
// }

// export default ListingItems;





import {
  FaMapMarkerAlt,
  FaGasPump,
  FaTachometerAlt,
} from "react-icons/fa";
import { GiGearStick } from "react-icons/gi";
import moment from 'moment'

function ListingItems({ listing }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      {/* IMAGE */}
      <div className="relative">
        <img
          src={listing.image?.[0]}
          alt={listing.name}
          className="h-56 w-full object-cover"
        />

        {/* TIME BADGE */}
        <span className="absolute top-3 right-3 bg-slate-700 text-white text-sm px-3 py-1 rounded-lg">
          {listing.createdAt
            ? `${Math.floor(
                (Date.now() - new Date(listing.createdAt)) /
                  (1000 * 60 * 60 * 24)
              )} days ago`
            : "Recently"}

            {/* {moment(listing.createdAt).fromNow()} */}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-3">
        {/* TITLE */}
        <h2 className="text-lg font-semibold text-slate-800">
          {listing.name}
        </h2>

        {/* LOCATION + TYPE */}
        <div className="flex justify-between items-center text-sm">
          <p className="flex items-center gap-1 text-green-700 font-medium">
            <FaMapMarkerAlt />
            {listing.location}
          </p>

          <span className="text-red-500 italic font-semibold">
            {listing.type === "sale" ? "Sale" : "Rent"}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-sm line-clamp-2">
          {listing.description}
        </p>

        {/* PRICE */}
        <p className="text-lg font-bold text-slate-700">
          ${listing.price?.toLocaleString()}
        </p>

        <hr />

        {/* FEATURES */}
        <div className="flex justify-between text-sm font-medium text-gray-800">
          <span className="flex items-center gap-1">
            <GiGearStick />
            {listing.transmission}
          </span>

          <span className="flex items-center gap-1">
            <FaGasPump />
            {listing.fuelType}
          </span>

          <span className="flex items-center gap-1">
            <FaTachometerAlt />
            {listing.mileage || 0} km
          </span>
        </div>
      </div>
    </div>
  );
}

export default ListingItems;
