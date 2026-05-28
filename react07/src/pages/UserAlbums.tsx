import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Album {
  userId: number;
  id: number;
  title: string;
}

function UserAlbums() {
  const { id } = useParams<{ id: string }>();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!id) return;

    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setUserName(response.data.name);
      })
      .catch(error => console.error("Error al obtener usuario: " + error));

    axios.get(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
      .then(response => {
        console.log(response.data);
        setAlbums(response.data);
      })
      .catch(error => alert("Error al obtener los albums: " + error.message));
  }, [id]);

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Albums de {userName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Listado de albums del usuario
        </Typography>

        <Container sx={{ mt: 4 }}>
          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Título</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {albums.map((album) => (
                <TableRow key={album.id}>
                  <TableCell>{album.id}</TableCell>
                  <TableCell>{album.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>

        <Button
          variant="outlined"
          color="secondary"
          component="a"
          href={`/usuarios/`}
          sx={{ mt: 2 }}
        >
          Volver al listado de usuarios
        </Button>
      </Container>
    </>
  );
}

export default UserAlbums;
