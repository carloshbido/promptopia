"use client" 
 
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

import Form from "../../components/Form"

function CreatePrompt() {
  const router = useRouter();
  const { data: session } = useSession();
 
  const [submitting, setSubmmiting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: ""
  })

  async function createPrompt(e) {
    e.preventDefault();
    setSubmmiting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        })
      });

      if(response.ok) {
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmmiting(false)
    }

  }

  return (
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
