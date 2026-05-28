import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { User } from "../models/Users";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

function UserDetalle() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    if (!id) return;

    axios
      .get<User>(`${url}/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => alert("Error al cargar: " + error));
  }, [id]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "90%",
          maxWidth: 800,
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 4,
          }}
        >
          <Typography variant="h4" color="primary">
            Detalle del Usuario
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <Box>
              <Typography variant="body1">
                <strong>ID:</strong> {user.id}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                <strong>Nombre:</strong> {user.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                <strong>Usuario:</strong> {user.username}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                <strong>Teléfono:</strong> {user.phone || "N/A"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                <strong>Sitio Web:</strong> {user.website || "N/A"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                <strong>Empresa:</strong> {user.company?.name || "N/A"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                <strong>Ciudad:</strong> {user.address?.city || "N/A"}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="outlined"
            color="secondary"
            component="a"
            href="/usuarios"
            fullWidth
          >
            Volver al listado de usuarios
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserDetalle;
