"use client" 
 
import { useState, useEffect } from "react";
import { useSearchParams, useRouter} from 'next/navigation';

import Form from "../../components/Form"

function UpdatePrompt() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmmiting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" })

  useEffect(() => {
    async function getPromptDetails() {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({ 
        prompt: data.prompt, 
        tag: data.tag 
      })
    }
    
    if(promptId) getPromptDetails()
  }, [ promptId ])

  async function updatePrompt(e) {
    e.preventDefault();
    setSubmmiting(true);

    if(!promptId) {
      return alert("Prompt ID not found")
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      });

      if(response.ok) {
        router.push("/")
      }
      
    } catch (error) {
      console.log("erro da API", error)
    } finally {
      setSubmmiting(false)
    }

  }

  return (
    <Form 
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt
