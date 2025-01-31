import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

async function getSubredditName(id){
    console.log("ID WAS", id);
    let rows = await fetch(`http://127.0.0.1:8000/subreddit/${id}/`);
    rows = await rows.json();
    console.log("HERE ARE");
    console.log(rows);
    return rows[0].subredditname;
}

async function sendUpvote(post){
    let body = JSON.stringify({
        postid: post.postid,
        vote: 1,
    });
    console.log(body);
    let vari = await fetch('http://127.0.0.1:8000/vote/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' // Ensure the server knows it's JSON
        },
        body: body
    });
    console.log(vari);
}

async function sendDownvote(post){
    let body = JSON.stringify({
        postid: post.postid,
        vote: 0,
    });
    console.log(body);
    let vari = await fetch('http://127.0.0.1:8000/vote/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' // Ensure the server knows it's JSON
        },
        body: body
    });
    console.log(vari);
}

const PostCard = ({ post }) => {  // Destructure the post prop
    const [votes, setVotes] = useState(post.upvotes-post.downvotes);
    const [subredditName, setSubredditName] = useState();

    useEffect(()=>{
        const func = async() => {
            const name = await getSubredditName(post.subredditid);
            setSubredditName(name);
        }
        func();
    }, []);
    
    console.log(post);
    return (
        <div className="border-b border-gray-400 text-left py-4">
            <div className="text-[10px] font-bold">r/{subredditName}</div>
            <div className="font-bold">{post.title}</div>
            <div>
                <div onClick = {() => {
                                            setVotes((votes)=> (votes+1));
                                            sendUpvote(post);
                                        }} className="cursor-pointer px-3 mx-2 inline bg-gray-300 rounded-full ">
                    <i className="fa-solid fa-arrow-up"></i>
                    {votes}
                </div>
                <div onClick = {() => {
                                            setVotes((votes)=> (votes-1));
                                            sendDownvote(post);
                                        }} className="cursor-pointer px-3 mx-2 inline bg-gray-300 rounded-full ">
                    <i className="fa-solid fa-arrow-down"></i>
                </div>
            </div>
        </div>
    );
};

export default PostCard;