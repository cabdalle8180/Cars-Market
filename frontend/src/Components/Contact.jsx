// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// function Contact({ listing }) {
//     const [Owner,setOwner]= useState(null)
//     const [message, setmessage]= useState("")

//     // fuction
//     const handllechange=(e)=>{
//         setmessage(e.target.value)
//     }




// useEffect(() => {
//   const fechOwner = async () => {
//     try {
//       const res = await fetch(`/api/user/${listing.salesREF}`);
//       const data = await res.json();
//       setOwner(data.user);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   fechOwner(); // ✅ HALKAN AYAA LA WACAYAA
// }, [listing.salesREF]);

//   return (
 

//    <>
//   {Owner && (
//     <div className="flex flex-col gap-2">
//       <p>
//         Contact: <span className="font-semibold">{Owner.username}</span>
//       </p>

//       <textarea
//         id="message"
//         name="message"
//         value={message}
//         onChange={handllechange}
//         className="p-3 border rounded-lg w-full"
//       ></textarea>

//       <Link
//   className="text-center p-3 rounded-lg bg-slate-700 text-white hover:opacity-85"
//   to={`mailto:${Owner.email}?subject=${encodeURIComponent(
//     `Regarding ${listing.name}`
//   )}&body=${encodeURIComponent(message)}`}
// >
//   Send message
// </Link>

//     </div>
//   )}
// </>

//   )
// }

// export default Contact















import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contact({ listing }) {
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => setMessage(e.target.value);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(`/api/user/${listing.salesREF}`);
        const data = await res.json();
        setOwner(data.user);
      } catch (err) {
        console.log(err);
      }
    };

    if (listing?.salesREF) fetchOwner();
  }, [listing?.salesREF]);

  return (
    <>
      {owner && (
        <div className="flex flex-col gap-2">
          <p>
            Contact: <span className="font-semibold">{owner.username}</span>
          </p>

          <textarea
            id="message"
            name="message"
            value={message}
            onChange={handleChange}
            placeholder="Write your message..."
            className="p-3 border rounded-lg w-full"
          />

          <Link
            className="text-center p-3 rounded-lg bg-slate-700 text-white hover:opacity-85"
            to={`mailto:${owner.email}?subject=${encodeURIComponent(
              `Regarding ${listing.name}`
            )}&body=${encodeURIComponent(message)}`}
          >
            Send message
          </Link>
        </div>
      )}
    </>
  );
}

export default Contact;
