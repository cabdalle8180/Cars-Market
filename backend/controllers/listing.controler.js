import { model } from "mongoose";
import CarListing from "../models/listining.model.js";

export const createListing = async (req, res,next) => {

    try {
        const Listing= await CarListing.create(req.body);
        res.status(201).json({
            success:true,
            message:"Listing created successfully",
            data:Listing
        })
    } catch (error) {
        next(error);
    }
}


// export const deletelisting = async (req,res,next)=>{
//     // const listing = CarListing.findById()

//     await CarListing.findByIdAndDelete(req.params.id)
//     res.status(200).json({message:"listing deleting sucessfull"})
// } 



export const deletelisting = async (req, res, next) => {
  try {
    // Validate ID format
    if (!req.params.id || req.params.id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID format",
      });
    }

    const listing = await CarListing.findById(req.params.id);

    // hubi in listing jiro
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // hubi in owner-ka tirtirayo - compare both as strings
    const salesRefStr = listing.salesREF.toString();
    const userIdStr = req.user.id.toString();
    
    if (salesRefStr !== userIdStr) {
      return res.status(401).json({
        success: false,
        message: "You are not allowed to delete this listing",
      });
    }

    await CarListing.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID format",
      });
    }
    next(error);
  }
};






export const updatelisting = async (req, res, next) => {
  try {
    // Validate ID format
    if (!req.params.id || req.params.id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID format",
      });
    }

    const listing = await CarListing.findById(req.params.id);

    // hubi in listing jiro
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // hubi in owner-ka tirtirayo - compare both as strings
    const salesRefStr = listing.salesREF.toString();
    const userIdStr = req.user.id.toString();
    
    if (salesRefStr !== userIdStr) {
      return res.status(401).json({
        success: false,
        message: "You are not allowed to update this listing",
      });
    }

    // Fix: Use findByIdAndUpdate instead of findByIdAndDelete
    const updatelist = await CarListing.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: updatelist
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID format",
      });
    }
    next(error);
  }
};


export const getlist= async(req,res,next)=>{
    try {
         const listing = await CarListing.findById(req.params.id);

    // hubi in listing jiro
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }
    res.status(200).json(listing);

    } catch (error) {
        next(error)
    }
}




export const getListing = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const startIndex = parseInt(req.query.startIndex) || 0;

    /* ================= OFFER ================= */
    let offer;
    if (req.query.offer === undefined || req.query.offer === "all") {
      offer = { $in: [true, false] };
    } else {
      offer = req.query.offer === "true";
    }

    /* ================= TYPE ================= */
    let type = req.query.type;
    if (!type || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    /* ================= CONDITION ================= */
    let condition = req.query.condition;
    if (!condition || condition === "all") {
      condition = { $in: ["New", "Used", "Damaged"] };
    }

    /* ================= TRANSMISSION ================= */
    let transmission = req.query.transmission;
    if (!transmission || transmission === "all") {
      transmission = { $in: ["Automatic", "Manual", "CVT"] };
    }

    /* ================= FUEL TYPE ================= */
    let fuelType = req.query.fuelType;
    if (!fuelType || fuelType === "all") {
      fuelType = { $in: ["Petrol", "Diesel", "Hybrid", "Electric"] };
    }

    /* ================= SEARCH ================= */
    const searchTerm = req.query.searchTerm || "";

    /* ================= SORT & ORDER ================= */
    const sort = req.query.sort || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    /* ================= QUERY ================= */
    const listings = await CarListing.find({
      offer,
      type,
      condition,
      transmission,
      fuelType,
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { model: { $regex: searchTerm, $options: "i" } },
        { make: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
      ],
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
