import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

//interface para definir el tipo de dato que se espera recibir de la API
interface post {
  id: number;
  title: string;
  body: string;
}

function Posts() {
  //estado para almacenar los posts obtenidos de la API
  const [posts, setPosts] = useState<post[]>([]);
  //estado para manejar el estado de carga de los posts
  const [loading, setLoading] = useState(false);

  //función para obtener los posts desde la API
  const fetchPosts = () => {
   setLoading(true);
    
    // 1. Corregido: El dominio es "typicode" (no typecode) y cambiamos "/users" por "/posts"
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch(error => alert("Error al obtener los posts: " + error.message))
      // 2. Corregido: Es una función setLoading(false), no una asignación "="
      .finally(() => setLoading(false)); 
  };

  // Hook para cargar los posts automáticamente cuando el componente se monta
  useEffect(() => {
    fetchPosts();
  }, []);

  return (

     <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Posts
        </Typography>
        <Typography variant="h6" gutterBottom>
          Listado de posts obtenidos desde la API
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={fetchPosts}
          disabled={loading} 
        >
          {loading ? "Cargando..." : "Obtener Posts"}
        </Button>

        <Container sx={{ mt: 4 }}>
          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                {/* Añadidos encabezados para la tabla */}
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Título</strong></TableCell>
                <TableCell><strong>Contenido</strong></TableCell>
                <TableCell>Ver Detalle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.body}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="inherit" href={`/post/${item.id}`}>
                      Ver Detalles
                    </Button>
                  </TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container> 
                
      </Container>
    </>
  );
}
export default Posts;
