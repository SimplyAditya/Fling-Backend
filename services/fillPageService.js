import db from "../app.js";


class fillPageService{

    static async fillRequestsPage(uId){
        const allID= await db.query("SELECT userwhoswiped FROM rightswipeusers where userwhogotswiped=$1",[uId]);
        const msg =new Array(allID.rows.length);
        for(let i=0;i<allID.rowCount;i++){
            msg[i]=allID.rows[i].userwhoswiped;
        }
        return msg;
    }

    static async fillFriendsPage(uId){

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

    static async fillUsersPage(uId){

    }

}

export default fillPageService;