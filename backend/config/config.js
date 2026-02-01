import mongoose from "mongoose";

const ConnectDB= async ()=>{
    const connection = await mongoose.connect(process.env.mongodb_local).then(()=>{
        console.log('connect mongoDB....');
        
    }).catch((err)=>{
        console.log(err);
        
    })
}
export default ConnectDB




