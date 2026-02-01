import mongoose from "mongoose";

const ListeningSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        image:{
            type:Array,
            required:true,
        },
        make:{
            type:String,
            required:true,
        },
        model:{
            type:String,
            required:true,
    },
    year:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        enum:["sale","rent"]
    },
    location:{
        type:String,
        required:true,
    },
    condition:{
        type:String,
        required:true,
        enum:["New","Used","Damaged"]
        
    },
    mileage:{
        type:Number,
        required:true,
    },
    fuelType:{
        type:String,
        required:true,
        enum:["Petrol","Diesel","Electric","Hybrid"]
    },
    salesREF:{
        type:String,
        required:true

    },
    transmission:{
        type:String,
        required:true,
        enum:["Automatic","Manual","CVT"]
    },
    offer:{
        type:Boolean,
    },
    discount: { type: Number, default: 0 }, 
}

)

const CarListing = mongoose.model("CarListing",ListeningSchema);

export default CarListing;