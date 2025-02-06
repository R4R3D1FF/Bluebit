import CommentCard from './commentCard.jsx';
import { useState, useEffect } from 'react';


// const posts = await fetchPosts();
// console.log(posts);

const ChildrenCards = ({ comments }) => {
  const [items, setItems] = useState();

  useEffect(() => {
    if (!comments)
      return;
    const func = async () => {
      setItems(await comments.map((item, index) => {

        return (
            <div>
                <CommentCard key={index} comment={item} />
                <div className = "pl-8">
                    {item.children && <ChildrenCards comments={item.children} />}
                </div>
            </div>
            
        ) // Create an 'Item' component for each item
    
      }));
    }

    func();
  }, []);

  

  return (

    <div>
      
        {items}

    </div>

  );

};

export {ChildrenCards};