import { PostCards } from "./postCards";
import { useParams } from "react-router-dom";


function Subreddit() {
    const { subname, mode } = useParams();
    return (
        <div className = "text-left">
            <a href = {`/r/${subname}/submit/`}>
                <div className="cursor-pointer px-3 mx-2 inline bg-gray-300 rounded-full">
                    <i className="fa-solid fa-plus"/>
                    Create Post
                </div>
            </a>
            <PostCards sub={subname} mode = {mode} />
        </div>
        
    )
}

export {Subreddit};