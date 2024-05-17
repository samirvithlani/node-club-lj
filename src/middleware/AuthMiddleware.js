const validateRequest = (req, res, next) => {

    const token =  req.headers.token
    console.log(token)
    if(token ==="123"){
        next()
    }
    else{
        res.status(401).json({
            message:"Unauthorized"
        })
    }
}
module.exports ={
    validateRequest
}