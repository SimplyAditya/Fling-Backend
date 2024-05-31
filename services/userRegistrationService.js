import db from "../app.js";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
class userRegistrationService {
    static async registerUser(email, password, name, dateOfBirth, country, gender, instaId, snapchatId, imageFile, imageFile2, imageFile3, preferredCountry, preferredGender) {
        try {
            const  getUniqueFilename = () => {
                const now = new Date();
                const datePart = now.toISOString().replace(/[-:.]/g, '');
                const randomPart = Math.floor(Math.random() * 1e6); // Generate a random number between 0 and 999999
                return `image_${datePart}_${randomPart}.png`;
            };
            var imageBuffer2,imagePath2,imageBuffer3,imagePath3;
            const imageBuffer = Buffer.from(imageFile, 'base64');
            const imagePath = path.join(__dirname, 'uploads',await getUniqueFilename());
            if(imageFile2!=null){
            imageBuffer2 = Buffer.from(imageFile2, 'base64');
            imagePath2 = path.join(__dirname, 'uploads',await getUniqueFilename());
            }
            if(imageFile3!=null){
            imageBuffer3 = Buffer.from(imageFile3, 'base64');
            imagePath3 = path.join(__dirname, 'uploads',await getUniqueFilename());
            }
            if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
                fs.mkdirSync(path.join(__dirname, 'uploads'));
            }
            console.log("Yha tak aaya");
            await fs.writeFile(imagePath, imageBuffer, async (err) => {
                if (err) {
                    return { status: "failure", msg: `${err}` };
                }
            });
            if(imageFile2!=null){
            await fs.writeFile(imagePath2, imageBuffer2, async (err) => {
                if (err) {
                    return { status: "failure", msg: `${err}` };
                }
            });
            }
            if(imageFile3!=null){
            await fs.writeFile(imagePath3, imageBuffer3, async (err) => {
                if (err) {
                    return { status: "failure", msg: `${err}` };
                }
            });
        }   
        if(imageFile2==null){
            imagePath2=null;
        }
        if(imageFile3==null){
            imagePath3=null;
        }

                const checkExisting = await db.query("SELECT * FROM users WHERE email =$1", [email]);
                const checkImage = await db.query("SELECT * FROM data WHERE imageFile=$1", [imageFile]);
                if (checkExisting.rows.length > 0) {
                    return { status: "failure", msg: "Email already exists", statusCode: 409 };
                }
                else if (checkImage.rows.length > 0) {
                    return { status: "failure", msg: "Image already exists", statusCode: 410 };
                }
                else {
                    const userIdresp = await db.query("INSERT INTO users (email,password) VALUES($1,$2) RETURNING userId", [email, password]);
                    const userId = userIdresp.rows[0].userid;
                    const finalResp = await db.query("INSERT INTO data(userId,fullName,dateOfBirth,country,gender,instaId,snapchatId,imageFile,imageFile2,imageFile3,preferredCountry,preferredGender) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
                        [userId, name, dateOfBirth, country, gender, instaId, snapchatId, imagePath, imagePath2, imagePath3, preferredCountry, preferredGender]);
                    return { status: "success", msg: "Registration Successful", statusCode: 200, userId: userId };
                }

        } catch (err) {
            return { status: "failure", msg: `${err}` };
        }
    }

    static async checkExistingImage(imageFile, imageFile2, imageFile3) {
        try {
            let result = await db.query("SELECT * FROM data where imageFile =$1 OR imageFile =$2 OR imageFile =$3",
                [imageFile, imageFile2, imageFile3]
            );
            let result1 = await db.query("SELECT * FROM data where imageFile2 =$1 OR imageFile2 =$2 OR imageFile2 =$3",
                [imageFile, imageFile2, imageFile3]
            );
            let result2 = await db.query("SELECT * FROM data where imageFile3 =$1 OR imageFile3 =$2 OR imageFile3 =$3",
                [imageFile, imageFile2, imageFile3]
            );
            if (result.rows.length > 0 || result1.rows.length > 0 || result2.rows.length > 0) {
                return { status: "success", msg: "Image Exist into Database", statusCode: 409 };
            } else {
                return { status: "success", msg: "All Images unique", statusCode: 200 };
            }
        } catch {
            return { status: "failure", msg: err };
        }
    }
    static async checkInsta(instaId) {
        let result = await db.query('select * from data where instaId=$1', [instaId]);
        if (result.rows.length > 0) {
            return { status: "success", msg: "Insta ID into Database", statusCode: 409 };
        }
        else {
            return { status: "success", msg: "unique", statusCode: 200 };
        }
    }
    static async checkSnap(snapchatId) {
        let result = await db.query('select * from data where snapchatId=$1', [snapchatId]);
        if (result.rows.length > 0) {
            return { status: "success", msg: "Snapchat ID into Database", statusCode: 409 };
        }
        else {
            return { status: "success", msg: "unique", statusCode: 200 };
        }
    }
}

export default userRegistrationService;




