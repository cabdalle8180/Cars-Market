// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ListingItems from "../Components/ListingItems";


// function Search() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [sidebar, setSidebar] = useState({
//     searchTerm: "",
//     type: "all",
//     offer: false,
//     sort: "createdAt",
//     order: "desc",
//     condition: "all",
//     transmission: "all",
//     fuelType: "all",
//   });

//   const [loading, setLoading] = useState(false);
//   const [listing, setListing] = useState([]);


//   // ================= HANDLE CHANGE (CLEAN) =================
//   const handleChange = (e) => {
//     const { id, value, checked, type } = e.target;

//     // radio type (all / sale / rent)
//     if (id === "all" || id === "sale" || id === "rent") {
//       setSidebar((prev) => ({ ...prev, type: id }));
//       return;
//     }

//     // checkbox
//     if (type === "checkbox") {
//       setSidebar((prev) => ({ ...prev, [id]: checked }));
//       return;
//     }

//     // sort + order
//     if (id === "sort_order") {
//       const [sort, order] = value.split("_");
//       setSidebar((prev) => ({ ...prev, sort, order }));
//       return;
//     }

//     // default (searchTerm, condition, transmission, fuelType)
//     setSidebar((prev) => ({ ...prev, [id]: value }));
//   };

//   // ================= SUBMIT =================
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const params = new URLSearchParams({
//       searchTerm: sidebar.searchTerm,
//       type: sidebar.type,
//       offer: sidebar.offer,
//       sort: sidebar.sort,
//       order: sidebar.order,
//       condition: sidebar.condition,
//       transmission: sidebar.transmission,
//       fuelType: sidebar.fuelType,
//     });

//     navigate(`/search?${params.toString()}`);
//   };

//   // ================= FETCH FROM URL =================
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);

//     setSidebar({
//       searchTerm: params.get("searchTerm") || "",
//       type: params.get("type") || "all",
//       offer: params.get("offer") === "true",
//       sort: params.get("sort") || "createdAt",
//       order: params.get("order") || "desc",
//       condition: params.get("condition") || "all",
//       transmission: params.get("transmission") || "all",
//       fuelType: params.get("fuelType") || "all",
//     });

//     const fetchListings = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/listing/get?${params.toString()}`);
//         const data = await res.json();
//         setListing(data);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListings();
//   }, [location.search]);

//   // const showMore = async()=>{
//   //   const numberOflisting= listing.length;
//   //   const startIndex= numberOflisting;
//   //   const params = new URLSearchParams(location.search);
//   //   params.set("startIndex",startIndex);
//   //   const searQuery= params.toString();
//   //   const res = await fetch(`/api/listing/get?${searQuery}`);
//   //   const data = await res.json();
//   //   setListing([...listing, ...data]);     
//   // }



//   const showMore = async () => {
//   try {
//     setLoadingMore(true);

//     const startIndex = listing.length;
//     const params = new URLSearchParams(location.search);
//     params.set("startIndex", startIndex);

//     const res = await fetch(`/api/listing/get?${params.toString()}`);
//     const data = await res.json();

//     if (data.length === 0) {
//       setShowMoreBtn(false);
//       return;
//     }

//     setListing((prev) => [...prev, ...data]);

//     if (data.length < 8) {
//       setShowMoreBtn(false);
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setLoadingMore(false);
//   }
// };


//   // ================= UI =================
//   return (
//     <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
//       {/* LEFT */}
//       <div className="w-full md:w-[320px] bg-white p-6 border-r">
//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//           <input
//             id="searchTerm"
//             value={sidebar.searchTerm}
//             onChange={handleChange}
//             placeholder="Search car..."
//             className="border p-3 rounded-lg"
//           />

//           {/* TYPE */}
//           {["all", "sale", "rent"].map((t) => (
//             <label key={t} className="flex gap-2">
//               <input
//                 type="radio"
//                 name="type"
//                 id={t}
//                 checked={sidebar.type === t}
//                 onChange={handleChange}
//               />
//               {t}
//             </label>
//           ))}

//           {/* OFFER */}
//           <label className="flex gap-2">
//             <input
//               type="checkbox"
//               id="offer"
//               checked={sidebar.offer}
//               onChange={handleChange}
//             />
//             Offer
//           </label>

//           {/* FUEL */}
//           <select
//             id="fuelType"
//             value={sidebar.fuelType}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="all">Any Fuel</option>
//             <option value="Petrol">Petrol</option>
//             <option value="Diesel">Diesel</option>
//             <option value="Hybrid">Hybrid</option>
//             <option value="Electric">Electric</option>
//           </select>

//           {/* TRANSMISSION */}
//           <select
//             id="transmission"
//             value={sidebar.transmission}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="all">Any Transmission</option>
//             <option value="Automatic">Automatic</option>
//             <option value="Manual">Manual</option>
//             <option value="CVT">CVT</option>
//           </select>

//           {/* CONDITION */}
//           <select
//             id="condition"
//             value={sidebar.condition}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="all">Any Condition</option>
//             <option value="New">New</option>
//             <option value="Used">Used</option>
//             <option value="Damaged">Damaged</option>
//           </select>

//           {/* SORT */}
//           <select
//             id="sort_order"
//             value={`${sidebar.sort}_${sidebar.order}`}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="price_desc">Price High → Low</option>
//             <option value="price_asc">Price Low → High</option>
//             <option value="createdAt_desc">Latest</option>
//             <option value="createdAt_asc">Oldest</option>
//           </select>

//           <button className="bg-slate-700 text-white p-3 rounded-lg">
//             Search
//           </button>
//         </form>
//       </div>


//       <div className="flex-1">
//   <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-7">
//     Listing results
//   </h1>

//   {/* Loading */}
//   {loading && <p className="p-3">Loading...</p>}

//   {/* No results */}
//   {!loading && listing.length === 0 && (
//     <p className="p-3 text-red-500">Listing not found</p>
//   )}

//   {/* Results */}
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//     {!loading &&
//       listing.length > 0 &&
//       listing.map((item) => (
//         <ListingItems key={item._id} listing={item} />
//       ))}
//   </div> {" "}
//  {showMoreBtn && (
//   <button
//     onClick={showMore}
//     disabled={loadingMore}
//     className="mx-auto my-7 px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50"
//   >
//     {loadingMore ? "Loading..." : "Show More"}
//   </button>
// )}

// </div>


//     </div>
//   );
// }

// export default Search;





import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ListingItems from "../Components/ListingItems";

function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 Pagination states (MUST be inside component)
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // 🔹 Sidebar filters
  const [sidebar, setSidebar] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    sort: "createdAt",
    order: "desc",
    condition: "all",
    transmission: "all",
    fuelType: "all",
  });

  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;

    if (id === "all" || id === "sale" || id === "rent") {
      setSidebar((prev) => ({ ...prev, type: id }));
      return;
    }

    if (type === "checkbox") {
      setSidebar((prev) => ({ ...prev, [id]: checked }));
      return;
    }

    if (id === "sort_order") {
      const [sort, order] = value.split("_");
      setSidebar((prev) => ({ ...prev, sort, order }));
      return;
    }

    setSidebar((prev) => ({ ...prev, [id]: value }));
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
      searchTerm: sidebar.searchTerm,
      type: sidebar.type,
      offer: sidebar.offer.toString(),
      sort: sidebar.sort,
      order: sidebar.order,
      condition: sidebar.condition,
      transmission: sidebar.transmission,
      fuelType: sidebar.fuelType,
    });

    navigate(`/search?${params.toString()}`);
  };

  // ================= FETCH LISTINGS =================
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setSidebar({
      searchTerm: params.get("searchTerm") || "",
      type: params.get("type") || "all",
      offer: params.get("offer") === "true",
      sort: params.get("sort") || "createdAt",
      order: params.get("order") || "desc",
      condition: params.get("condition") || "all",
      transmission: params.get("transmission") || "all",
      fuelType: params.get("fuelType") || "all",
    });

    const fetchListings = async () => {
      try {
        setLoading(true);
        setShowMoreBtn(true);

        const res = await fetch(`/api/listing/get?${params.toString()}`);
        const data = await res.json();

        setListing(data);

        if (data.length < 8) {
          setShowMoreBtn(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  // ================= SHOW MORE =================
  const showMore = async () => {
    try {
      setLoadingMore(true);

      const startIndex = listing.length;
      const params = new URLSearchParams(location.search);
      params.set("startIndex", startIndex);

      const res = await fetch(`/api/listing/get?${params.toString()}`);
      const data = await res.json();

      if (data.length === 0) {
        setShowMoreBtn(false);
        return;
      }

      setListing((prev) => [...prev, ...data]);

      if (data.length < 8) {
        setShowMoreBtn(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  };


  // ================= UI =================
  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      {/* LEFT */}
      <div className="w-full md:w-[320px] bg-white p-6 border-r">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            id="searchTerm"
            value={sidebar.searchTerm}
            onChange={handleChange}
            placeholder="Search car..."
            className="border p-3 rounded-lg"
          />

          {["all", "sale", "rent"].map((t) => (
            <label key={t} className="flex gap-2">
              <input
                type="radio"
                name="type"
                id={t}
                checked={sidebar.type === t}
                onChange={handleChange}
              />
              {t}
            </label>
          ))}

          <label className="flex gap-2">
            <input
              type="checkbox"
              id="offer"
              checked={sidebar.offer}
              onChange={handleChange}
            />
            Offer
          </label>

          <select id="fuelType" value={sidebar.fuelType} onChange={handleChange} className="border p-2 rounded">
            <option value="all">Any Fuel</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>

          <select id="transmission" value={sidebar.transmission} onChange={handleChange} className="border p-2 rounded">
            <option value="all">Any Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="CVT">CVT</option>
          </select>

          <select id="condition" value={sidebar.condition} onChange={handleChange} className="border p-2 rounded">
            <option value="all">Any Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Damaged">Damaged</option>
          </select>

          <select
            id="sort_order"
            value={`${sidebar.sort}_${sidebar.order}`}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="price_desc">Price High → Low</option>
            <option value="price_asc">Price Low → High</option>
            <option value="createdAt_desc">Latest</option>
            <option value="createdAt_asc">Oldest</option>
          </select>

          <button className="bg-slate-700 text-white p-3 rounded-lg">
            Search
          </button>
        </form>
      </div>

      {/* RIGHT */}
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-7">
          Listing results
        </h1>

        {loading && <p className="p-3">Loading...</p>}

        {!loading && listing.length === 0 && (
          <p className="p-3 text-red-500">Listing not found</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {!loading &&
            listing.length > 0 &&
            listing.map((item) => (
              <ListingItems key={item._id} listing={item} />
            ))}
        </div>

        {showMoreBtn && (
          <button
            onClick={showMore}
            disabled={loadingMore}
            className="mx-auto my-7 px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50"
          >
            {loadingMore ? "Loading..." : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;

