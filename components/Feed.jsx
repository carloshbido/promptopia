"use client"

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
 
function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async function() {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    })();
  },[])

  return ( 
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          className="search_input peer"
          type="text" 
          placeholder="Search for a tha or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required  
        />
      </form>

      <PromptCardList 
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed
