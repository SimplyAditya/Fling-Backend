import db from "../app.js";
import moment from "moment-timezone";

class getUserInfoService{
    static async getCompleteInfo(userId){
        const user =await db.query("SELECT * FROM data where userid=$1",[userId]);
        const userEmail =await db.query("SELECT email FROM users where userid=$1",[userId]);
        // console.log(userEmail.rows[0].email);
        user.rows[0].dateofbirth = moment(user.rows[0].dateofbirth).tz('Asia/Kolkata').format('YYYY-MM-DD');
        const msg={
            ...user.rows[0],
            email:userEmail.rows[0].email,
        }
        return {msg};
    }

    static async getName(userId){
        let userData =await db.query("SELECT fullname FROM data where userid=$1",[userId]);
        return userData.rows[0].fullname;
    }

    static async getDateOfBirth(userId){
        let userData =await db.query("SELECT dateofbirth FROM data where userid=$1",[userId]);
        const istDateOfBirth = moment(userData.rows[0].dateofbirth).tz('Asia/Kolkata').format('YYYY-MM-DD');
        return istDateOfBirth;
    }

    static async getCountry(userId){
        let userData =await db.query("SELECT country FROM data where userid=$1",[userId]);
        return userData.rows[0].country;
    }

    static async getGender(userId){
        let userData =await db.query("SELECT gender,maingender FROM data where userid=$1",[userId]);
        return userData.rows[0];
    }

    static async getInsta(userId){
        let userData =await db.query("SELECT instaid FROM data where userid=$1",[userId]);
        return userData.rows[0].instaid;
    }

    static async getSnap(userId){
        let userData =await db.query("SELECT snapchatid FROM data where userid=$1",[userId]);
        return userData.rows[0].snapchatid;
    }

    static async getPreferredCountry(userId){
        let userData =await db.query("SELECT preferredcountry FROM data where userid=$1",[userId]);
        return userData.rows[0].preferredcountry;
    }

    static async getPreferredGender(userId){
        let userData =await db.query("SELECT preferredgender,prefgender FROM data where userid=$1",[userId]);
        return userData.rows[0];
    }



}

export default getUserInfoService;