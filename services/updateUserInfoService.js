import db from "../app.js";
import getUserInfoService from "./getUserInfoService.js";


class updateUserInfoService{
    static async updateUserInfo(uId,fullName,dateOfBirth,country,gender,maingender,instaId,snapchatId,preferredCountry,preferredGender,prefGender){
            const existingUserData=getUserInfoService.getCompleteInfo(uId);
            if(existingUserData.fullName!=fullName){
                await db.query("UPDATE data SET fullname = $1 WHERE userid=$2",[fullName,uId]);
            }
            if(existingUserData.dateOfBirth!=dateOfBirth){
                await db.query("UPDATE data SET dateofbirth = $1 WHERE userid=$2",[dateOfBirth,uId]);
            }
            if(existingUserData.country!=country){
                await db.query("UPDATE data SET country = $1 WHERE userid=$2",[country,uId]);
            }
            if(existingUserData.gender!=gender){
                await db.query("UPDATE data SET gender = $1 WHERE userid=$2",[gender,uId]);
            }
            if(existingUserData.maingender!=maingender){
                await db.query("UPDATE data SET maingender = $1 WHERE userid=$2",[maingender,uId]);
            }
            if(existingUserData.instaId!=instaId){
                await db.query("UPDATE data SET instaid = $1 WHERE userid=$2",[instaId,uId]);
            }
            if(existingUserData.snapchatId!=snapchatId){
                await db.query("UPDATE data SET snapchatid = $1 WHERE userid=$2",[snapchatId,uId]);
            }
            if(existingUserData.preferredCountry!=preferredCountry){
                await db.query("UPDATE data SET preferredcountry = $1 WHERE userid=$2",[preferredCountry,uId]);
            }
            if(existingUserData.preferredGender!=preferredGender){
                await db.query("UPDATE data SET preferredgender = $1 WHERE userid=$2",[preferredGender,uId]);
            }
            if(existingUserData.prefGender!=prefGender){
                await db.query("UPDATE data SET prefgender = $1 WHERE userid=$2",[prefGender,uId]);
            }
            return {status:"Success",statusCode:200};
    }

}

export default updateUserInfoService;