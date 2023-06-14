"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

function MyProfile() {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPosts] = useState([])
  

  useEffect(() => {
    async function fetchPosts () {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if(session?.user.id) fetchPosts();
  },[])

  function handleEdit() {}
  async function handleDelete() {}

  return (
    <Profile 
      name="My"
      desc="Welcome to your persolinazed profile page"
      data={post}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
