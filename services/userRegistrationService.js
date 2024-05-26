import db from "../app.js";


class userRegistrationService{
    static async registerUser(email,password){
        try{
           const checkExisting = await db.query("SELECT * FROM users WHERE email =$1",[email]);
           if(checkExisting.rows.lenngth>0){
            return {status:"failure",msg:"Email already exists",statusCode:409};
           }
           else{
            await db.query("INSERT INTO users (email,password) VALUES($1,$2)",[email,password]);
            return {status:"success" ,msg:"Registration Successful",statusCode:200};
           }
        }catch(err){
            return {status:"failure",msg:err};
        }
    }
}

export default userRegistrationService;