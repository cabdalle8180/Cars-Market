import { log } from "console";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import CarListing from "../models/listining.model.js";


export const test= (req,res)=>{
    res.send({
        succes:true,
        message:"api is working"})
}


export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({
      success: false,
      message: "You can only update your own profile",
    });
  }

  try {
    const updateData = {
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar,
    };

    // password kaliya haddii uu jiro
    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json({
      success: true,
      message: "User has been updated",
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({
      success: false,
      message: "You can only delete your own profile",
    });
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User has been deleted",
    })
    
  } catch (error) {
    log(error);
  }
}

export const getuserlisting= async(req,res,next)=>{
  try {
    // Check if user is trying to access their own listings
    if(req.user.id.toString() !== req.params.id.toString()) {
      return res.status(401).json({
        success: false,
        message: "You can only view your own listings"
      });
    }
   
    // Find listings where salesREF matches the user ID (both as strings)
    const listing= await CarListing.find({salesREF: req.params.id.toString()})
    
    res.status(200).json(listing);

  } catch (error) {
    next(error);
  }
}








export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Ka saar password-ka
    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      user: rest,
    });
  } catch (error) {
    next(error); // error middleware ayuu u gudbinayaa
  }
};
