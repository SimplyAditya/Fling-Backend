import userRegistrationService from "../services/userRegistrationService.js";


const registerUser = async (req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    try{
        const msg=await userRegistrationService.registerUser(email,password);
        res.json({msg});
    }
    catch(err){
        return {status:"failure",msg:err};
    }
}

export default {registerUser};