import mongoose from "mongoose";
import { type } from "os";

const userShema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    avatar:{
        type:String,
        default: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAmwMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAQIH/8QAMRAAAgIABAMGBAYDAAAAAAAAAAECAwQRITESQVEFEzJhcYEiUpGhI0JTcpKxFDM0/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7iAAAAAAAADzOyFcc5yUV5lWztCtPKEZS89kBcBmS7QsfhjFfc8/51/WP0A1QZax9y3UH7EsO0P1K/wCIF8ENWJqs0jLXo9CYAAAAAAAAAAAAB5nJQi5SeSW4HW0k23kkUMRj9405fuZBisS7pZLSC2RAB2UpTfFJtvzZwBavJblQBNHDyfiyie1hl87+gFY4Tywz/LJP1IpRcHlJZAcJ6MXZTkm+OPRkAA2aboXRzg/VdCUwoSlCalB5SXM1cLiY3xyek1uiKsAAAAAAAAGVjcR3tnDF/BH7st4+3u6uFaSnpn0MsAACoJNvJavkXKqlWttXzIsLDPOfsiyRQAADzKKmsmsz0AKNkHXNxep5LeIjxQ9NSoVA7CThJSi8muZwAbOHuV1akt+a6MlMnA3d1dk/DLRmsRQAAADxbLgrlLomwMrG2d5iJPlHREIBUAABcw6/BRIQ4Z51ZdGTEUAAAAAceqaM9bF+b4Yt+RRCAAKBsYWzvKIye+WTMc0OzJ5xnB8nmRV4AACDGvLDT9Micr47/mn7f2BkgAqAAAkonwT12ZcM8mpucVlPVdegVaByMlLwvM6QAcbSWbehDZelmq9X1A5iZ/kXuVx6gqAAAFvsx/jSXWJULfZv+9/tA0wARQixMeKicVu4koAwQe7ocFso9GeCoADIAFq8lr6E1dDes9F0LEYqK+FJIiqsabHqll6vIk7q751/JlgAVJU2t6vi9yOUJR8SaL4AzwWrKIy8PwsrShKDykvcqOAAAXey4/FOXTJFI1Oz4cOHT+Z5kVaAAAAAZ3aVWTjYlpsykblkFZBwlszFtrdU3CXIDytXktX0LVNPdrN6yOYerKPE939icAAAAAAAAAeZxU48LR6AFK2t1y1WnJngvTgpxaexTnFwk1IqO01u2yMFz39DailGKS2SKuAo7uHHLxS+yLZFAAAAAAhxFEbUm947EwAotNPJoFuytTXR9SrOEoPKQHAAAAAAAAABuAPcMOrHGc1pHbzJK6ec17EyA6AAAAAAAAAABxpNZM6AIJULeGnkyKVcovwsuACiC7kuZzgj8q+gFM6oyeybLiilskdArRob8WiJoVqGy92ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//Z"
    }
},{timestamps:true})

const User=     mongoose.model('User',userShema);

export default User