import db from "../app.js";
import deleteOldRows from "./deleteOldRows.js";


class fillPageService {

    static async fillRequestsPage(uId) {
        const allID = await db.query("SELECT userwhoswiped FROM rightswipeusers where userwhogotswiped=$1", [uId]);
        const msg = new Array(allID.rows.length);
        for (let i = 0; i < allID.rowCount; i++) {
            msg[i] = allID.rows[i].userwhoswiped;
        }
        return msg;
    }

    static async fillFriendsPage(uId) {

        const friendsList1 = await db.query("SELECT userid FROM friendList WHERE uid=$1", [uId]);
        const friendsList2 = await db.query("SELECT uid FROM friendList WHERE userid=$1", [uId]);

        const friendsListArray1 = friendsList1.rows.map(row => row.userid);
        const friendsListArray2 = friendsList2.rows.map(row => row.uid);

        // Check if either array is empty and return the other array if true
        if (friendsListArray1.length === 0) {
            return friendsListArray2;
        }
        if (friendsListArray2.length === 0) {
            return friendsListArray1;
        }

        // Merge the two arrays and remove duplicates using a Set
        const mergedFriendsListArray = [...new Set([...friendsListArray1, ...friendsListArray2])];

        return mergedFriendsListArray;

    }

    static async fillUsersPage(uId) {
        deleteOldRows.deleteOldRows();
        const userPreferences = await db.query("SELECT preferredcountry,preferredgender,prefgender from data where userid=$1", [uId]);
        const { preferredcountry, preferredgender, prefgender } = userPreferences.rows[0];

        let query = `
            SELECT userid FROM data 
            WHERE userid != $1
        `;
        let queryParams = [uId];

        if (preferredcountry.toLowerCase() !== "everywhere") {
            query += " AND preferredcountry = $2";
            queryParams.push(preferredcountry);
        }

        if (prefgender) {
            query += queryParams.length === 1 ? " AND gender = $2" : " AND gender = $3";
            queryParams.push(prefgender);
        } else {
            query += queryParams.length === 1 ? " AND maingender = $2" : " AND maingender = $3";
            queryParams.push(preferredgender);
        }

        let preferredUsers = await db.query(query, queryParams);


        // Remove country constraint if no users found
        if (preferredUsers.rows.length === 0 && preferredcountry.toLowerCase() !== "everywhere") {
            query = query.replace(" AND preferredcountry = $2", "");
            queryParams = [uId];

            if (prefgender) {
                query = query.replace(" AND gender = $3", " AND gender = $2");
                queryParams.push(prefgender);
            } else {
                query = query.replace(" AND maingender = $3", " AND maingender = $2");
                queryParams.push(preferredgender);
            }

            preferredUsers = await db.query(query, queryParams);
        }

        // Remove prefgender constraint if no users found and prefgender is not null
        if (preferredUsers.rows.length === 0 && prefgender) {
            queryParams = [uId];
            if (preferredcountry.toLowerCase() !== "everywhere") {
                queryParams.push(preferredcountry);
            }
            query = query.replace(" AND gender = $2", "");
            queryParams.push(preferredgender ? prefgender : preferredgender);

            preferredUsers = await db.query(query, queryParams);
        }

        // Remove gender constraint if no users found
        if (preferredUsers.rows.length === 0) {
            queryParams = [uId];
            if (preferredcountry.toLowerCase() !== "everywhere") {
                queryParams.push(preferredcountry);
            }
            query = query.replace(" AND gender = $2", "")
                .replace(" AND maingender = $2", "")
                .replace(" AND gender = $3", "")
                .replace(" AND maingender = $3", "");

            preferredUsers = await db.query(query, queryParams);
        }

        const msg = new Array(preferredUsers.rows.length);
        for (let i = 0; i < preferredUsers.rowCount; i++) {
            msg[i] = preferredUsers.rows[i].userid;
        }

        const leftswiped=await db.query("SELECT userwhogotswiped from leftswipeusers where userwhoswiped =$1",[uId]);
        const exclusions = new Array(leftswiped.rows.length);
        for (let i = 0; i < leftswiped.rowCount; i++) {
            exclusions[i] = leftswiped.rows[i].userwhogotswiped;
        }

        const filteredMsg = msg.filter(userid => !exclusions.includes(userid));

        return filteredMsg;

    }

}

export default fillPageService;