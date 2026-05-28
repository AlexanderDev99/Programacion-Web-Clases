import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function UserTodos() {
  const { id } = useParams<{ id: string }>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!id) return;

    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setUserName(response.data.name);
      })
      .catch(error => console.error("Error al obtener usuario: " + error));

    axios.get(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
      .then(response => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch(error => alert("Error al obtener los todos: " + error.message));
  }, [id]);

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tareas de {userName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Listado de tareas del usuario
        </Typography>

        <Container sx={{ mt: 4 }}>
          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Título</strong></TableCell>
                <TableCell align="center"><strong>Estado</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell>{todo.id}</TableCell>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell align="center">
                    {todo.completed ? (
                      <Typography color="success.main"><strong>✓ Completado</strong></Typography>
                    ) : (
                      <Typography color="warning.main"><strong>⟳ Pendiente</strong></Typography>
                    )}
                  </TableCell>
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

export default UserTodos;
