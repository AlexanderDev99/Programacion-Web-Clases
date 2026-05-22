import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Post } from "../models/Posts.tsx";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

function PostDetalle() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post>({ id: 0, title: "", body: "" });

  useEffect(() => {
    if (!id) return; // Validación de seguridad para el ID
    axios
      .get<Post>(`${url}/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => alert("Error al cargar: " + error));
  }, [id]);

  const handleGuardar = () => {
    // Se cambia a PUT y se agrega el ID en la URL porque estamos editando
    axios
      .put<Post>(`${url}/${id}`, post) 
      .then((response) => {
        setPost(response.data);
        alert("¡Cambios guardados con éxito!");
      })
      .catch((error) => alert("Error al guardar: " + error));
  };

  return (
    <>
      <Box sx={{ maxWidth: 600, margin: "20px auto", px: 2 }}>
        <Card variant={"elevation"} sx={{ borderRadius: 2 }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
                Editar Post
              </Typography>
              <Typography variant="caption" color="textSecondary" sx={{ fontWeight: "bold" }}>
                ID: {post.id}
              </Typography>
            </Box>

            <TextField
              label={"Título del post"}
              variant={"outlined"}
              value={post.title}
              fullWidth
              onChange={e => setPost({ id: post.id, title: e.target.value, body: post.body})}
            />

            <TextField
              label={"Contenido"}
              variant={"outlined"}
              value={post.body}
              fullWidth
              multiline
              rows={4}
               onChange={e => setPost({ id: post.id, title:post.title, body: post.body})}
            />
          </CardContent>

          {/* Comentario corregido: Botones de acción */}
          <CardActions sx={{ justifyContent: "flex-end", px: 4, pb: 4, gap: 1 }}>
            <Button
              color="inherit" // Cambiado a un tono más neutral para diferenciarlo
              variant="outlined"
              component={Link}
              to={"/post"}
            >
              Regresar
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleGuardar} // Corregido: onClick con la "C" mayúscula
            >
              Guardar Cambios
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}

export default PostDetalle;