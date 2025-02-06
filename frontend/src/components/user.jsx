import { PostCards } from "./postCards";
import { useParams } from "react-router-dom";


function User() {
    console.log("INSIDE USER");
    const { username, mode } = useParams();
    return (
        <div className = "text-left">
            <a href = {`/u/${username}/submit/`}>
                <div className="cursor-pointer px-3 mx-2 inline bg-gray-300 rounded-full">
                    <i className="fa-solid fa-plus"/>
                    Create Post
                </div>
            </a>
            <PostCards sub={username} mode = {mode} userpageMode={1} />
        </div>
        
    )
}

export {User};