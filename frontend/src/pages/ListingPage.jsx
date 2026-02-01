import React, { useState } from 'react'
import { useAppContext} from "../Context/AppContex.jsx"

function ListingPage() {
    const {currentUser} = useAppContext();
    const [files,setFiles] = useState([])
    const [imageUrl, setImageUrl] = useState([])
    const [imageUploadError, setImageUploadError] = useState(null)
    const [Uploadingimage,setUpLoadingimage] = useState(false)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState (false)
    const [ListingData,setListingData] = useState({
        name:"",
        description:"",
        price:"",
        image:[],
        make:"",
        model:"",
        year:"",
        type:"",
        location:"",
        condition:"new",
        mileage:"",
        offer:false,
        // regularPrice:0,
        discount:"",
        fuelType:"Petrol",
        salesREF:currentUser._id,
        transmission:"Automatic",
        
    })

    const handleChnage = (e) => {
        if(e.target.id === "sale" || e.target.id === "rent") {
            setListingData({...ListingData, type: e.target.id})
            
    }
    if(e.target.id === "offer") {
        setListingData({...ListingData, offer: e.target.checked})
    }
    if(e.target.type=== "number" || e.target.type=== "text" || e.target.type=== "textarea" || e.target.type=== "select-one") {
        setListingData({...ListingData, [e.target.id]: e.target.value})
    }
}
    console.log(ListingData);
    

    const handlefileChange = (e) => {
        const selectedfiles= Array.from(e.target.files)
        if(files.length + selectedfiles.length > 6) {
            setImageUploadError("You can only upload 6 images")
            return
        }
        setFiles(prevFiles => [...prevFiles, ...selectedfiles])
        setImageUploadError(null)
        
    }
    // signal that images are being uploaded
    const handleUploadImages = async (image) => {
        const data= new FormData();
      data.append("file",image)
      data.append("upload_preset","car_market")
      data.append("api_key",import.meta.env.VITE_CLOUDINARY_API_KEY)
     
      const res= await fetch("https://api.cloudinary.com/v1_1/divtrtyu9/image/upload",{
        method:"POST",
        body:data
      })
        if(!res.ok){
            throw new Error("Image upload failed")
        }
        const uploadImage= await res.json();
        return uploadImage.url
    }   
    // fuction to multiple image upload
    const uploadMultipleImages = async () => {
        if(files.length === 0) {
            setImageUploadError("Please select images to upload")
            return
        }
        setImageUploadError(null)
        setUpLoadingimage(true)

        const uploadedUrls = []
      
        try {
            for (const file of files) {
                const url= await handleUploadImages(file)
                uploadedUrls.push(url)
            }
            setImageUrl((prev)=>[...prev,...uploadedUrls])
            setFiles([])
            setListingData((prev)=>({...prev, image:[...prev.image,...uploadedUrls]}))

        } catch (error) {
           console.error( error)
              setImageUploadError("Failed to upload images. Please try again.")
            
        }
        setUpLoadingimage(false)
    }
    const handlleRemove = (index) => {
        setImageUrl(prev => prev.filter((_, i) => i !== index))
        setListingData((prev)=>({...prev, image: prev.image.filter((_, i) => i !== index)}))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if(imageUrl.length === 0) {
                setImageUploadError("Please upload at least one image")
                setLoading(false);
                return
            }
            if(+ListingData.discount >= +ListingData.price) {
                setError("Discount price must be less than regular price")
                setLoading(false);
                return
            }

            const res = await fetch("/api/listing/create-listing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ListingData),
            });
            if(!res.ok) {
                throw new Error ("Failed to create listing")
            }
            const data = await res.json();
            console.log("Listing created successfully", data);
            setLoading(false);
        } catch (error) {
            setError(error.message)
            setLoading(false)   
        }
    };

  return (
    <main className='max-w-4xl mx-auto p-3'>
      <h1 className='text-center font-semibold text-3xl my-7'>Listing Page</h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 '>
        <div className="left flex-1  flex flex-col gap-4">
            <input type="text" onChange={handleChnage} value={ListingData.name} placeholder="Carname..." id='name' className='p-3  rounded-lg border ' required />
            <textarea type="text" onChange={handleChnage} value={ListingData.description} placeholder="description..." id='description' className='p-3  rounded-lg border ' required/>
            <input type="text" onChange={handleChnage} value={ListingData.make} placeholder="make..." id='make' className='p-3  rounded-lg border ' required />
            <input type="text" onChange={handleChnage} value={ListingData.model} placeholder="model eg: Camry..." id='model' className='p-3  rounded-lg border ' required />
            <input type="number" onChange={handleChnage} value={ListingData.year} placeholder="year eg: 2020..." id='year' className='p-3  rounded-lg border ' required />
            <input type="number" onChange={handleChnage} value={ListingData.mileage} placeholder="mileage eg: 50000..." id='mileage' className='p-3  rounded-lg border ' required />
            <select name="fuelType" onChange={handleChnage} value={ListingData.fuelType} id="fuelType" className='p-3  rounded-lg border ' required>
                
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
            </select>
            <select name="transmission" onChange={handleChnage} value={ListingData.transmission} id="transmission" className='p-3  rounded-lg border ' required>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="CVT">CVT</option>
            </select>
            <select name="condition" onChange={handleChnage} value={ListingData.condition} id="condition" className='p-3  rounded-lg border ' required>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Damaged">Damaged</option>
            </select>
            <input type="text" onChange={handleChnage} value={ListingData.location} placeholder="location eg: mogadisho..." id='location' className='p-3  rounded-lg border ' required />
            <div className='gap-6 flex flex-wrap '> 
            <div className='flex  gap-2'>
                <input type="checkbox" id='sale' checked={ListingData.type === "sale"} onChange={handleChnage}  className='w-5'  />
                <span>sale</span>
            </div>
            <div className='flex  gap-2'>
                <input type="checkbox"  id='rent' checked={ListingData.type === "rent"} onChange={handleChnage}  className='w-5 '/>
                <span>rent</span>
            </div>
            <div className='flex  gap-2'>
                <input type="checkbox"  onChange={handleChnage} checked={ListingData.offer}  id='offer' className='w-5 '/>
                <span>offer</span>
            </div>
            </div>
            <div className='flex gap-2 items-center'>
            <input onChange={handleChnage} value={ListingData.price}  type="number" placeholder="price..." id='price' className='p-3  rounded-lg border  border-gray-300' required />
            <div className=' flex flex-col items-center'>
                <p >Regular Price</p>
                {ListingData.type=== "rent" && <span>/month</span> }
            </div>
            </div>
            {ListingData.offer && ( 
            <div className='flex gap-2 items-center'>
            <input onChange={handleChnage} value={ListingData.discount} type="number" placeholder="discount..." id='discount' className='p-3  rounded-lg border  border-gray-300' required />
            <div className=' flex flex-col items-center'>
                <p>discount Price</p>
               {ListingData.type=== "rent" && <span>/month</span> }
            </div>
            </div>
)}
        </div>

        <div className=" flex-1 flex flex-col gap-4">
            <p className='font-semibold'>images: { " " }
                <span className='font-normal text-gray-600 ml-2'>the first image will be the cover max(6)</span>
            </p>
            <div className='flex gap-4'>
                <input onChange={handlefileChange} type="file" id='images' multiple  accept="image/*" className='w-full border border-gray-600 p-3 rounded-lg '  required />
                <button type='button' onClick={uploadMultipleImages} disabled={Uploadingimage} className=' text-green-700 border border-green-700 p-3 uppercase hover:shadow-lg disabled:opacity-95'>
                    {Uploadingimage ? "Uploading..." : "Upload Images"}
                </button>
            </div>
            <p className='text-red-700 rounded-lg uppercase'>{imageUploadError && imageUploadError}</p>
            <div>
             {imageUrl.map((url,index)=>(
                <div key={index} className=' border flex justify-between  items-center p-3'>
                <img className='w-20 h-20 rounded-lg object-contain' src={url} />
                <button type='button' onClick={() => handlleRemove(index)} className='uppercase p-3 text-red-700 rounded-lg hover:opacity-80'>delete</button>
                </div>
             ))}
             

            </div>
            <button disabled={Uploadingimage} className='p-3 bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-80'>Create Listing</button>
            </div>
      </form>
    </main>
  )
}

export default ListingPage