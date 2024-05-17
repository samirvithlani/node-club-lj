const validateSchema = (schema) =>async(req,res,next)=>
{
    try{
        await schema.parseAsync({
            body:req.body,
        });
        next();
    }   
    catch(error){
        res.status(400).json({
            message:error
        })

    } 
}
module.exports = {validateSchema}