import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

function ConsumoFetch() {
  const [postId, setPostId] = useState("1");
  const [post, setPost] = useState<Post | null>(null);

  const handleClick = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json' 
      }
    })
    .then(response => response.json()) 
    .then(data => {
      setPost(data);
      //alert(data.title); 
    })
    .catch(error => console.error("Error:", error))
    .finally(() => setLoading(false));
  }; 

  return (
    <>
      <h2>Fetch</h2>
      Id: <input 
        type="text" 
        placeholder="id" 
        value={postId}
        onChange={e => setPostId(e.target.value)}
      />

      <button onClick={handleClick}>Llamar API</button>
      <br/>
      {
        post &&(
    <div>
        <p>ID: {post?.id}</p>
        <p>Title: {post?.title}</p>
        <p>Body: {post?.body}</p>
      </div>
        )
      }
      
    </>
  );
} 

export default ConsumoFetch;

function setLoading(arg0: boolean): void {
    throw new Error("Function not implemented.");
}
