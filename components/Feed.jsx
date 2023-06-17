"use client"

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ posts, onTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.map((post) => (
        <PromptCard
          key={post.id}
          post={post}
          onTagClick={ onTagClick }
        />
      ))}
    </div>
  )
}
 
function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const filteredPost = posts.filter(post => post.prompt.includes(searchText) || 
                                            post.creator.email.includes(searchText) || 
                                            post.tag.includes(searchText))

  useEffect(() => {
    (async function() {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    })();
  }, [])

  function handleTagClick(tag) {
    setSearchText(tag)
  }

  return ( 
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          className="search_input peer"
          type="text" 
          placeholder="Search a prompt or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required  
        />
      </form>

       <PromptCardList 
        posts={filteredPost}
        onTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed
