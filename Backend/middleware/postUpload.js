const multer = require("multer");
const path = require("path");
const upload = require("./uploadMiddleware");

const storage = multer.diskStorage({
    destination: (req , file , cb)=>{
        cb(null, "uploads/posts");
    }, 
    filename:(req, file , cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
})


const uploadPost = multer({
    storage , 
    fileFilter: (req, file, cb)=>{
        if(
            file.mimetype.startsWith("image")|| 
            file.mimetype.startsWith("video")
        ){
            cb(null , true);
        } else {
            cb(new  Error ("Only image or video"))
        }
    }
})

module.exports = uploadPost;