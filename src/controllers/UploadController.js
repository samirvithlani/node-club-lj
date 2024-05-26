const multer = require('multer');
const path = require('path');
const cloudanryUpload = require('../utils/CloudnaryUpload');

const storage = multer.diskStorage({
    //destination:"./uploads",
    filename: function(req, file, cb){
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req,file,cb){
        const fileTypes = /jpeg|jpg|png|gif/
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = fileTypes.test(file.mimetype)
        if(extname && mimetype){
            return cb(null,true)
        }
        else{
            cb("Error: Images only!")
        }
    }
    
}).single("myImage")

// const checkFileType = (file,cb) => {
//     const fileTypes = /jpeg|jpg|png|gif/
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = fileTypes.test(file.mimetype)
//     if(extname && mimetype){
//         return cb(null,true)
//     }
//     else{
//         cb("Error: Images only!")
//     }
    
// }



const uploadFile = async(req, res) => {


        upload(req,res,async(err)=>{
            if(err){
                res.status(400).json({
                    message: "Error uploading file",
                    err: err
                })
            }
            else{
                //cloundinary upload
                const result = await cloudanryUpload.uploadFile(req.file.path)
                console.log(result)
                res.status(200).json({
                    message: "File uploaded successfully",
                    file: req.file
                })
            }
        })

}

module.exports = {
    uploadFile
}



