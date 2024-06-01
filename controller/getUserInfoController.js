import getUserInfoService from "../services/getUserInfoService.js";

const getUserInfoController=async(req,res,next)=>{
    const {uId}=req.body;
    const msg = await getUserInfoService.getCompleteInfo(uId);
    res.json({msg});
};

const getNameController=async(req,res,next)=>{
    const {uId}=req.body;
    const msg=await getUserInfoService.getName(uId);
    res.json({msg});
};

const getCountryController=async(req,res,next)=>{
    const {uId}=req.body;
    const msg=await getUserInfoService.getCountry(uId);
    res.json({msg});
};
const getGenderController=async(req,res,next)=>{
    const {uId}=req.body;
    const msg=await getUserInfoService.getGender(uId);
    res.json({msg});
};
const getInstaController=async(req,res,next)=>{
    const {uId}=req.body;
    const msg=await getUserInfoService.getInsta(uId);
    res.json({msg});
};
const getSnapController=async(req,res,next)=>{
    const {uId}=req.body;
    const msg=await getUserInfoService.getSnap(uId);
    res.json({msg});
};
const getPreferredCountryController=async(req,res,next)=>{
    const {uId}=req.body;
    const msg=await getUserInfoService.getPreferredCountry(uId);
    res.json({msg});
};

const getPreferredGenderController=async(req,res,next)=>{
    const {uId}=req.body;
    const msg=await getUserInfoService.getPreferredGender(uId);
    res.json({msg});
};


export default {getUserInfoController,getNameController,getCountryController,getGenderController,getInstaController,getSnapController,getPreferredCountryController,getPreferredGenderController};