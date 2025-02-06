import PostCard from './postCard.jsx';
import { useState, useEffect } from 'react';

async function fetchPosts(sub = "all", mode = "top", userpageMode = 0) {
  console.log("INSIDE FETCHPOSTS");
  try {
    let response;
    if (!userpageMode)
      response = await fetch(`http://127.0.0.1:8000/r/${sub}/${mode}?count=0`);
    else
      response = await fetch(`http://127.0.0.1:8000/u/${sub}/`);
    console.log("RESPOSE AAYA", response);
    const data = await response.json();

    if (Array.isArray(data)) {
      return data; // Ensure the result is an array
    } else {
      console.error('Unexpected response format:', data);
      return []; // Return empty array if data is not an array
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return []; // Return empty array in case of an error
  }
}


// const posts = await fetchPosts();
// console.log(posts);

const PostCards = ({ sub, mode, userpageMode = 0 }) => {
  const [posts, setPosts] = useState();
  const [items, setItems] = useState();

  useEffect(() => {
    const temp = async () => {
      let postList;
      console.log("INSIDE POSTCARDS");
      postList = await fetchPosts(sub, mode, userpageMode);
      


      setPosts(postList);
    };
    temp();
  }, []);

  useEffect(() => {
    if (!posts)
      return;
    const func = async () => {
      setItems(await posts.map((item, index) => {

        return <PostCard key={index} post={item} /> // Create an 'Item' component for each item
    
      }));
    }

    func();
  }, [posts]);

  

  return (

    <div>

      {items}

    </div>

  );

};

export {PostCards};