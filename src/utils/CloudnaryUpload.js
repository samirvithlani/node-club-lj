const cloudanry = require('cloudinary').v2;

cloudanry.config({
    cloud_name: "add your bucket",
    api_key:"add your key",
    api_secret:"add your secret"
})


const uploadFile = async(file) => {
    const res  = await cloudanry.uploader.upload(file)
    return res
}
module.exports = {uploadFile}