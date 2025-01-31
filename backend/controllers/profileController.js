import getUserPosts from "../userProfile.js";

async function profileController(req, res){
    console.log("GETTING");
    // const subreddit = req.params[0]; // Captures the * part (subreddit name)
    // const commentId = req.params[1]; // Captures the :id part (comment ID)
    try{
        const rows = await getUserPosts(req.params.id, 10);
        console.log(rows);
        res.status(200).json(rows);
    }
    catch(err){
        res.status(404);
    }
}

export default profileController;