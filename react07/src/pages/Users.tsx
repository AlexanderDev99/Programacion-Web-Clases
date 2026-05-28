import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import type { User } from "../models/Users";

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => alert("Error al obtener los usuarios: " + error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Usuarios
        </Typography>
        <Typography variant="h6" gutterBottom>
          Listado de usuarios obtenidos desde la API
        </Typography>

        <Container sx={{ mt: 4 }}>
          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell colSpan={4} align="center"><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" href={`/usuarios/${user.id}`}>
                      Ver Detalle
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" href={`/usuarios/${user.id}/posts`}>
                      Ver Posts
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" href={`/usuarios/${user.id}/todos`}>
                      Ver Todos
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" href={`/usuarios/${user.id}/albums`}>
                      Ver Albums
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

export default Users;
