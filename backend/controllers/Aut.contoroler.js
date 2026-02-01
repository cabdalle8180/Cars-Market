import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import JWT from 'jsonwebtoken'
export const signup = async (req, res,next) => {
  try {
    const { username, email, password } = req.body;

    // hubi in dhammaan fields la keenay
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // ✅ HASH PASSWORD
    const hashedPassword = bcrypt.hashSync(password, 10);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword // ✅ password field sax
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser
    });
  } catch (error) {
    next(error)
  }
};

// login auth
export const signin= async (req,res,next)=>{


  const {email,password}= req.body;
  const validaterUser= await User.findOne({ email })
  if(!validaterUser)
    return next(404,"not found")

  const ismach= await bcrypt.compareSync(password,validaterUser.password)
  if(!ismach)
     return next(401,'invalid credintials')
    const {password:pass, ...rest}=validaterUser._doc
  try{
    // jsowebtoken
    const token= JWT.sign({id:validaterUser.id},process.env.JWT_SECRET)
   
    res
  .cookie('access_token',token,
    {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
    }
  ).status(200).json(rest)
  } 
  
  
  catch (error) {
    next(error)
  }

}

// google
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = JWT.sign(
        { id: user._id },
        process.env.JWT_SECRET
      );

      const { password, ...rest } = user._doc;

      return res
        .cookie('access_token', token, {
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
        })
        .status(200)
        .json(rest);
    }

    // 👉 Create new user
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

    const username =
      req.body.name
        .split(" ")
        .join("")
        .toLowerCase() +
      Math.random().toString(36).slice(-4);

    const newUser = new User({
      username,
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.photoURL,
      // avator: req.body.avatar,
    });

    await newUser.save();

    const token = JWT.sign(
      { id: newUser._id },
      process.env.JWT_SECRET
    );

    const { password, ...rest } = newUser._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
      })
      .status(200)
      .json(rest);

  } catch (error) {
    next(error);
  }
};

export const signout= async (req,res,next)=>{
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json({ message: "User signed out successfully" });
  } catch (error) {
    next(error);
  }
};
