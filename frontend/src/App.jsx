import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {posts, PostCards} from './components/postCards.jsx';
import { AllCards, SubCards } from './components/subCards.jsx';
// import SubCards  from './components/subCards.jsx';




const Layout = () => {
  return (
    <div className="absolute left-0 top-0 bg-gray-100 w-full h-full">
      <header className="fixed bg-gray-200 w-full h-[10%] border-b border-gray-400 z-50">
        <a href="">
          <img src="https://logos-world.net/wp-content/uploads/2023/12/Reddit-Logo.png" className="absolute h-20 inline left-[1%]" alt="Reddit Logo" />
        </a>
        <div className="absolute w-1/3 translate-x-[100%] top-[25%] bg-gray-300 p-[0.5%] rounded-full">
          <input type="text" className="search-input" placeholder="Search Reddit" autoComplete="off" />
        </div>
        <div className="inline absolute right-0 top-[33%]">
          <div className="bg-orange-700 py-2 mx-3 inline px-3 rounded-full">
            <a href = "/login/" className="text-gray-200">
              <b>Log In</b>
            </a>
          </div>
          <div className="inline options-button">
            <b>. . .</b>
          </div>
        </div>
      </header>
      <div className="absolute top-[10%] flex space-x-1 h-full">
        <div className="w-1/6 p-4 border-gray-400 border-r">
          <AllCards subs={[{subredditname: "Heresy"}]}/>
        </div>
        <div className="w-2/3 p-4 border-gray-400 border-r">
          <PostCards posts={posts}/>
        </div>
        <div className="w-1/6 p-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse illo tempora
            recusandae praesentium debitis laboriosam temporibus? Unde dicta eaque dolores modi
            debitis quibusdam consequuntur quae provident cum. Quos, explicabo minus!
            Our HTML editor updates the webview automatically in real-time as you write code.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
