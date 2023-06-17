"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

function MyProfile() {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([])
  

  useEffect(() => {
    async function fetchPosts () {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if(session?.user.id) fetchPosts();
  },[])

  function handleEdit(post) {
    router.push(`/update-prompt?id=${post._id}`)
  }

  async function handleDelete(post) {
    const hasConfirmed = confirm("Are you sure you wanr to delete this prompt?");

    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE"
        })

        const filteredPost = posts.filter(p => p._id !== post._id)
        setPosts(filteredPost)
      } catch (error) {
        console.log(error)
      }
    
    }
  }

  return (
    <Profile 
      name="My"
      desc="Welcome to your persolinazed profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
