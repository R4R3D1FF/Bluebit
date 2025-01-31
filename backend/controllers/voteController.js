import { upvotePost } from "../postAPI.js";
import { downvotePost } from "../postAPI.js";

async function voteController(req, res){
    console.log("INSIDE POST");
    console.log(req.body);
    // Extract data from the request body
    const { postid, vote } = req.body;

    if (vote)
        upvotePost(postid);
    else
        downvotePost(postid);

    // Send a response
    res.status(200).json({ message: 'Data processed successfully' });
}

export default voteController;