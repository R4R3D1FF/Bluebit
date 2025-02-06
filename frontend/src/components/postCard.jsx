import { useState, useEffect, useRef } from "react";
import { PiArrowFatUp, PiArrowFatDown, PiArrowFatUpFill, PiArrowFatDownFill } from "react-icons/pi";




// const HollowArrowUp = () => (
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="w-6 h-6 inline"
//     >
//         <path d="M12 5l7 7h-4v7h-6v-7H5z" />
//     </svg>
// );

// const SolidArrowUp = () => (
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//         fill="currentColor"
//         stroke="none"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="w-6 h-6 inline"
//     >
//         <path d="M12 5l7 7h-4v7h-6v-7H5z" />
//     </svg>
// );

async function getSubredditName(id){
    console.log("ID WAS", id);
    let rows = await fetch(`http://127.0.0.1:8000/subreddit/${id}/`);
    rows = await rows.json();
    console.log("HERE ARE");
    console.log(rows);
    return rows[0].subredditname;
}

async function updateUserVote(userid, postid, vote){
    fetch(`http://127.0.0.1:8000/vote/${userid}/${postid}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Ensure the server knows it's JSON
            },
            body: JSON.stringify({
                "vote": vote
            })
        }
    )
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

async function revokeUpvote(post){
    let body = JSON.stringify({
        postid: post.postid,
        vote: 1,
    });
    console.log(body);
    let vari = await fetch('http://127.0.0.1:8000/vote/', {
        method: 'DELETE',
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

async function revokeDownvote(post){
    let body = JSON.stringify({
        postid: post.postid,
        vote: 0,
    });
    console.log(body);
    let vari = await fetch('http://127.0.0.1:8000/vote/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json' // Ensure the server knows it's JSON
        },
        body: body
    });
    console.log(vari);
}


const PostCard = ({ post }) => {  // Destructure the post prop
    const [card, setCard] = useState(1);
    const [votes, setVotes] = useState(post.upvotes-post.downvotes);
    const [uservote, setUservote] = useState();
    const [subredditName, setSubredditName] = useState();
    const isFirstRender = useRef(true);

    useEffect(()=>{
        const func = async() => {
            const name = await getSubredditName(post.subredditid);
            setSubredditName(name);
            if (!localStorage.getItem('userid')){
                setUservote(0);
                return;
            }
            const response = await fetch(`http://127.0.0.1:8000/vote/${localStorage.userid}/${post.postid}`);
            const data = await response.json(); // Parse JSON
            if (data.length > 0) { // Ensure the response contains data
                setUservote(data[0].vote);
            } else {
                console.warn("No vote data found");
                setUservote(0); // Handle missing vote
            }
        }
        func();
        
    }, []);

    useEffect(()=>{
        if (isFirstRender.current) {
            isFirstRender.current = false; // Mark as rendered
            return; // Skip the effect on the first render
        }
        if (!localStorage.getItem('userid'))
            return;
        
        if (uservote === undefined)
            return;

        updateUserVote(localStorage.userid, post.postid, uservote);
        
        
    }, [uservote]);



    
    console.log(post);
    return (
        
        <div className="border-b border-gray-400 text-left py-4 ">
            <a className = "!text-black" href = {`/r/${subredditName}/comments/${post.postid}/`}>
                <div className="text-[10px] font-bold">r/{subredditName}</div>
                <div className="font-bold">
                    
                        {post.title}
                    
                </div>
                {card ? <div>{post.content}</div> : null}
                
            </a>
            <div className = {`inline rounded-full ${uservote === 0 ? "" : "text-white"} ${uservote === 1 ? "bg-orange-600" : uservote === -1 ? "bg-blue-400" : "bg-gray-300"}`} >
                <div
                    className="cursor-pointer px-1 inline rounded-full"
                    onClick={() => {
                        if (!localStorage.getItem('userid'))
                            window.location.href = "/login";
                        else if (uservote == 0) {
                            setUservote(1);
                            setVotes((votes) => votes + 1);
                            sendUpvote(post);
                        } 
                        else if (uservote == -1){
                            setUservote(1);
                            setVotes((votes) => votes + 2);
                            sendUpvote(post);
                            revokeDownvote(post);
                        }
                        else {
                            setUservote(0);
                            setVotes((votes) => votes - 1);
                            revokeUpvote(post);
                        }
                    }}
                >
                    {uservote ===1? <PiArrowFatUpFill className="inline"/> :  <PiArrowFatUp className="inline"/>}
                </div>
                
                <div className = "px-1 inline">
                    {votes}
                </div>
                


                <div
                    className="cursor-pointer px-1 inline rounded-full"
                    onClick={() => {
                        if (!localStorage.getItem('userid'))
                            window.location.href = "/login";
                        else if (uservote == 0) {
                            setUservote(-1);
                            setVotes((votes) => votes - 1);
                            sendDownvote(post);
                        } 
                        else if (uservote == 1){
                            setUservote(-1);
                            setVotes((votes) => votes - 2);
                            sendDownvote(post);
                            revokeUpvote(post);
                        }
                        else {
                            setUservote(0);
                            setVotes((votes) => votes + 1);
                            revokeDownvote(post);
                        }
                    }}
                >
                    {uservote ===-1? <PiArrowFatDownFill className="inline"/> :  <PiArrowFatDown className="inline"/>}
                </div>

            </div>
        </div>
    );
};

export default PostCard;