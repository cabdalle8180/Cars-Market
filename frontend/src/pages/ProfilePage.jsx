import React, { useState } from 'react'
import{useAppContext} from '../Context/AppContex'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'




function ProfilePage() {
  const { currentUser , updateStart, updateSuccess, updateFailure, deleteStart, deleteSuccess, deleteFailure } = useAppContext()
  const [ showlistinig, setshowlistinig]=useState([]);
  const [ showlistinigerreo, setshowlistinigerrer]=useState(false)

  const fileRef=useRef(null);

  const [imageUrl,setimageUrl]=useState(null);
  const [updatedData,setupdatedData]=useState({
    
  })
  const handleChange=async (e)=>{
    const file =e.target.files[0];
    console.log(file);
    
    if(!file) return;
    
    try {
      const data= new FormData();
      data.append("file",file)
      data.append("upload_preset","car_market")
      data.append("api_key",import.meta.env.VITE_CLOUDINARY_API_KEY)
     
      const res= await fetch("https://api.cloudinary.com/v1_1/divtrtyu9/image/upload",{
        method:"POST",
        body:data
      })
      const upload= await res.json();
      
      if(upload.error){
        toast.error("Failed to upload image. Please try again.");
        return;
      }
      
      setimageUrl(upload.url)
      setupdatedData((prev)=>({...prev,avatar:upload.url}))
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    }
  }

  const handleChangeInput=(e)=>{
    setupdatedData({...updatedData,[e.target.id]:e.target.value})
    
  }



  const handleSubmit=async (e)=>{
    e.preventDefault();
    
    if(!currentUser || !currentUser._id){
      toast.error("User not found. Please sign in again.");
      updateFailure("User not found. Please sign in again.");
      return;
    }
    
    if(Object.keys(updatedData).length === 0){
      toast.info("No changes to update.");
      return;
    }
    
    updateStart();

    try {
      const res= await fetch(`/api/user/update/${currentUser._id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        credentials: 'include',
        body:JSON.stringify(updatedData)
      })
      const data= await res.json();
      if(!res.ok){
        toast.error(data.message || "Failed to update profile.");
        updateFailure(data.message);
      }else{
        toast.success("Profile updated successfully!");
        updateSuccess(data.data);
        setupdatedData({});
      }
      
    } catch (error) {
      toast.error(error.message || "Failed to update profile. Please try again.");
      updateFailure(error.message);
    }
  }

  const handleDelete=async ()=>{
    if(!currentUser || !currentUser._id){
      toast.error("User not found. Please sign in again.");
      deleteFailure("User not found. Please sign in again.");
      return;
    }
    const confirmDelete= window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if(!confirmDelete) return;
    deleteStart();

    try {
      const res= await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE",
        credentials: 'include',
      })
      const data= await res.json();
      if(!res.ok){
        toast.error(data.message || "Failed to delete account.");
        deleteFailure(data.message);
      }else{
        toast.success("Account deleted successfully!");
        deleteSuccess();
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete account. Please try again.");
      deleteFailure(error.message);
    }
  }

  const handleSignOut= async()=>{
    try {
      const res= await fetch('/api/auth/signout',{
        method:"GET",
        credentials: 'include',
      })
      if(!res.ok){
        toast.error("Failed to sign out. Please try again.");
      }else{
        toast.success("Signed out successfully!");
        deleteSuccess();
      }
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
    }
  }

  console.log(showlistinig);
  

const deletinglisting = async (id) => {
  if (!id) {
    toast.error("Invalid listing ID");
    return;
  }

  try {
    const res = await fetch(
      `/api/listing/delete-listing/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to delete listing");
      return;
    }

    // Fix: Use the id parameter instead of showlistinig._id
    setshowlistinig((prev) =>
      prev.filter((listing) => listing._id !== id)
    );

    toast.success("Listing deleted successfully");
  } catch (error) {
    console.error("Delete listing error:", error);
    toast.error(error.message || "Failed to delete listing. Please try again.");
  }
};






const handalleCarlist = async () => {
  if (!currentUser || !currentUser._id) {
    toast.error("User not found. Please sign in again.");
    return;
  }

  try {
    setshowlistinigerrer(false);

    const res = await fetch(`/api/user/listing/${currentUser._id}`, {
      method: 'GET',
      credentials: 'include',
    });
    
    const data = await res.json();

    if (!res.ok) {
      setshowlistinigerrer(true);
      toast.error(data.message || "Failed to fetch listings");
      return;
    }

    setshowlistinig(data);
    if (data && data.length > 0) {
      toast.success("Listings loaded successfully");
    } else {
      toast.info("No listings found");
    }
  } catch (error) {
    setshowlistinigerrer(true);
    toast.error(error.message || "Something went wrong");
  }
};




  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold'>ProfilePage</h1>
      <input type="file" ref={fileRef} onChange={handleChange} hidden/>
      <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <img src={imageUrl ? imageUrl : currentUser.avatar} onClick={()=>fileRef.current.click()} className='h-24 w-24 text-center rounded-full object-cover self-center mt-4' alt="profile picture" />
        <input defaultValue={currentUser.username} onChange={handleChangeInput} type="text" id='username' placeholder='username' className='p-3 border rounded-lg' />
        <input defaultValue={currentUser.email} onChange={handleChangeInput} type="email" id='email' placeholder='email' className='p-3 border rounded-lg' />
        <input  onChange={handleChangeInput} type="password" id='password' placeholder='password' className='p-3 border rounded-lg' />
        <button type='submit' className='cursor-pointer bg-slate-700 uppercase p-3 rounded-lg text-white '>Update</button>
        <Link to={"/listing"} type='submit' className='cursor-pointer bg-green-700 text-center uppercase p-3 rounded-lg text-white '>Create Listing</Link>
      </form>
      <div className=' flex justify-between mt-5'>
        <span onClick={handleDelete} className='cursor-pointer text-red-700 '>Delete Acount</span>
        <span onClick={handleSignOut} className='cursor-pointer text-red-700 '>Sing Out</span>
      </div>
      <button onClick={handalleCarlist} className='text-green-700 w-full'>show Carlisting</button>
      <p>{showlistinigerreo ? "there is error for showung list" : " "}</p>
      {
        showlistinig && showlistinig.length > 0 && (
          <div>
            <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listing </h1>
            {showlistinig.map((listing)=>(
              <div className='border rounded-lg p-3 flex justify-between items-center' key={listing._id}>
                <Link  className='flex-1' to={`/listing/${listing._id}`}><img className='h-16 w-16 object-contain' src={listing.image[0]} /></Link>
                <Link className='text-slate-700  hover:cursor-pointer hover:underline truncate flex-1' to={`/listing/${listing._id}`}><p className='text-right hover:underline'>{listing.name}</p></Link>
                <div className='flex flex-col items-center'>
                  <button onClick={()=> deletinglisting(listing._id)} className='text-red-700 uppercase'>delete</button>
               <Link to={`/listing-update/${listing._id}`}> <button className='text-green-700 uppercase'>edit</button> </Link>
                </div>
              </div>
              
            ))}
          </div>
        )
      }
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default ProfilePage












