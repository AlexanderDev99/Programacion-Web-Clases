import axios from "axios";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

function ConsumoAxios() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const handleClick = () => {
    setLoading(true);
    
    // 1. Corregido: El dominio es "typicode" (no typecode) y cambiamos "/users" por "/posts"
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => alert(error))
      // 2. Corregido: Es una función setLoading(false), no una asignación "="
      .finally(() => setLoading(false)); 
  };

  return (
    <>
      <h2>Consumo Axios</h2>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Cargando..." : "Llamar API"}
      </button>
      
      {loading && <p>Cargando....</p>}

      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>ID</th>
            <th style={{ textAlign: "left" }}>Title</th>
            <th style={{ textAlign: "left" }}>Body</th>
          </tr>
        </thead>
        <tbody>
          {/* 3. Corregido: El .map() necesita una función que retorne el JSX de cada fila */}
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ConsumoAxios;