import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function UserPosts() {
  const { id } = useParams<{ id: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!id) return;

    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setUserName(response.data.name);
      })
      .catch(error => console.error("Error al obtener usuario: " + error));

    axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
      .then(response => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch(error => alert("Error al obtener los posts: " + error.message));
  }, [id]);

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Posts de {userName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Listado de posts del usuario
        </Typography>

        <Container sx={{ mt: 4 }}>
          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Título</strong></TableCell>
                <TableCell><strong>Contenido</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.body}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>

        <Button
          variant="outlined"
          color="secondary"
          component="a"
          href={`/usuarios`}
          sx={{ mt: 2 }}
        >
          Volver al listado de usuarios
        </Button>
      </Container>
    </>
  );
}

export default UserPosts;
