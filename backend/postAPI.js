import connectAndQuery from "./postgresQuery.js";



function post(userId, title, content){
    console.log(`INSERT INTO Posts (postid, userid, title, content) VALUES ((SELECT COUNT(*) FROM Posts), ${userId}, '${title}', '${content}');`);
    connectAndQuery(`INSERT INTO Posts (postid, userid, title, content) VALUES ((SELECT COUNT(*) FROM Posts), ${userId}, '${title}', '${content}');`);
}

async function getPost(postid){
    console.log(`SELECT * FROM Posts WHERE postid = ${postid}`);
    const result =  await connectAndQuery(`SELECT * FROM Posts WHERE postid = ${postid}`);
    console.log("posts Gotten:", result.rows);
    return result.rows;
}

async function upvotePost(postid){
    console.log(`UPDATE Posts SET upvotes = upvotes + 1 WHERE postid = ${postid}`);
    const result =  await connectAndQuery(`UPDATE Posts SET upvotes = upvotes + 1 WHERE postid = ${postid}`);
    // console.log("posts Gotten:", result);
    // return result;
}

async function downvotePost(postid){
    console.log(`UPDATE Posts SET downvotes = downvotes + 1 WHERE postid = ${postid}`);
    const result =  await connectAndQuery(`UPDATE Posts SET upvotes = upvotes - 1 WHERE postid = ${postid}`);
    // console.log("posts Gotten:", result);
    // return result;
}

export { post, getPost ,upvotePost, downvotePost};