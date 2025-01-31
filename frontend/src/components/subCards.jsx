import { useEffect, useState } from "react";
import SubCard from "./subCard.jsx";

const SubCards = 
({ subs }) => {
    console.log("SUBS WERE", subs);
    const items = subs.map((item, index) => {
        return <SubCard key={index} sub={item} /> // Create an 'Item' component for each item
  
    });
  
  
  
    return (
  
      <div>
  
        {items}
  
      </div>
  
    );
  
};

const AllCards = () => {
    const [subs, setSubs] = useState([]); // State to store fetched data
  
    useEffect(() => {
      const fetchSubs = async () => {
        const resp = await fetch("http://127.0.0.1:8000/subreddits/");
        const data = await resp.json();
        console.log("RESPONDED", data);
        setSubs(data); // Store the data in state
      };
  
      fetchSubs(); // Call fetch function when component mounts
    }, []); // Empty dependency array to run once when the component mounts
  
    return <SubCards subs={subs} />; // Render SubCards with fetched subs
  };

export {SubCards, AllCards};