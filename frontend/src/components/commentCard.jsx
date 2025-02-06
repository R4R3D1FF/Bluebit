import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

async function getUsername(id){
    console.log("ID WAS", id);
    let rows = await fetch(`http://127.0.0.1:8000/user/${id}/`);
    rows = await rows.json();
    console.log("HERE ARE");
    console.log(rows);
    return rows[0].username;
}

// async function sendUpvote(post){
//     let body = JSON.stringify({
//         postid: post.postid,
//         vote: 1,
//     });
//     console.log(body);
//     let vari = await fetch('http://127.0.0.1:8000/vote/', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json' // Ensure the server knows it's JSON
//         },
//         body: body
//     });
//     console.log(vari);
// }

// async function sendDownvote(post){
//     let body = JSON.stringify({
//         postid: post.postid,
//         vote: 0,
//     });
//     console.log(body);
//     let vari = await fetch('http://127.0.0.1:8000/vote/', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json' // Ensure the server knows it's JSON
//         },
//         body: body
//     });
//     console.log(vari);
// }

const CommentCard = ({ comment }) => {  // Destructure the post prop
    const [username, setUsername] = useState();

    useEffect(()=>{
        const func = async() => {
            const name = await getUsername(comment.userid);
            setUsername(name);
        }
        func();
    }, []);
    
    console.log(comment);
    return (
        <div className="border-b border-gray-400 text-left py-4">
            <div className="text-[10px] font-bold">{username}</div>
            <div>{comment.content}</div>
            {/* <div>
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
            </div> */}
            
        </div>
    );
};

export default CommentCard;