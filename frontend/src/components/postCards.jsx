import PostCard from './postCard.jsx';

async function fetchPosts() {
  try {
    const response = await fetch('http://127.0.0.1:8000/r/all/top?count=0');
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


const posts = await fetchPosts();
console.log(posts);

const PostCards = ({ posts }) => {

  const items = posts.map((item, index) => {

    return <PostCard key={index} post={item} /> // Create an 'Item' component for each item

  });



  return (

    <div>

      {items}

    </div>

  );

};

export {posts, PostCards};