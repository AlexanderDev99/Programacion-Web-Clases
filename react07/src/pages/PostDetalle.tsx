// Importar librerías necesarias para el componente
import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import type { Post } from "../models/Posts.tsx";

// Importar componentes de Material-UI para diseño y estilos
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

// Interfaz para los comentarios
interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

// Componente PostDetalle: permite visualizar y editar un post individual
function PostDetalle() {
  // URL base de la API JSONPlaceholder
  const url = "https://jsonplaceholder.typicode.com/posts";

  // Extraer el ID del post desde los parámetros de la URL
  const { id } = useParams<{ id: string }>();

  // Estado para almacenar los datos del post actual
  const [post, setPost] = useState<Post>({ id: 0, title: "", body: "" });
  
  // Estado para almacenar los comentarios del post
  const [comments, setComments] = useState<Comment[]>([]);
  
  // Estado para manejar la carga de comentarios
  const [loadingComments, setLoadingComments] = useState(false);

  //############# GET

  // Hook: Se ejecuta cuando el componente se monta o cuando el ID cambia
  useEffect(() => {
    // Validación de seguridad para asegurar que existe un ID
    if (!id) return;

    // Realizar solicitud GET para obtener el post por ID
    axios
      .get<Post>(`${url}/${id}`)
      .then((response) => {
        // Actualizar estado con los datos obtenidos del servidor
        setPost(response.data);
      })
      .catch((error) => alert("Error al cargar: " + error));
  }, [id]);

  // Hook: Se ejecuta para cargar los comentarios cuando el ID cambia
  useEffect(() => {
    // Validación de seguridad para asegurar que existe un ID
    if (!id) return;

    // Realizar solicitud GET para obtener los comentarios del post
    setLoadingComments(true);
    axios
      .get<Comment[]>(`${url}/${id}/comments`)
      .then((response) => {
        // Actualizar estado con los comentarios obtenidos
        setComments(response.data);
      })
      .catch((error) => console.error("Error al cargar comentarios: " + error))
      .finally(() => setLoadingComments(false));
  }, [id]);

  //############## INPUTS
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  //################# PUT
  // Manejador para guardar cambios: realiza una solicitud PUT
  const handleGuardar = () => {
    // Se usa PUT para actualizar un recurso existente por su ID
    axios
      .put<Post>(`${url}/${id}`, post)
      .then((response) => {
        // Actualizar estado con la respuesta del servidor
        console.log("Actualizado:", response.data);
        alert("¡Cambios guardados con éxito!");
      })
      .catch((error) => console.error("Error al guardar: " + error));
  };

   // POST
    const handleAgregar = () => {

        const nuevoPost = {
            title: post.title,
            body: post.body
        }

        axios.post(url, nuevoPost)
            .then(response => {

                console.log("Nuevo post agregado:", response.data)

                alert("Post agregado correctamente")

                // limpiar inputs
                setPost({
                    id: 0,
                    title: '',
                    body: ''
                })
            })
            .catch(error => {
                console.error("Error al agregar:", error)
            })
    }

  // Renderizar la interfaz
 return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f2f5",
                p: 2
            }}
        >
            <Card
                sx={{
                    width: "90%",
                    maxWidth: 1000,
                    borderRadius: 3,
                    boxShadow: 5
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        p: 4
                    }}
                >
                    <Typography variant="h4" color="primary">
                        Detalle del Post
                    </Typography>

                    <Typography variant="body1">
                        <strong>ID:</strong> {post.id}
                    </Typography>

                    <TextField
                        fullWidth
                        label="Título"
                        value={post.title}
                        variant="outlined"
                        name="title"
                        onChange={handleInputChange}
                    />

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Body"
                                value={post.body}
                                multiline
                                rows={6}
                                variant="outlined"
                                name="body"
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="h6" color="primary" gutterBottom>
                                Comentarios ({comments.length})
                            </Typography>
                            {loadingComments ? (
                                <Typography>Cargando comentarios...</Typography>
                            ) : comments.length > 0 ? (
                                <List
                                    sx={{
                                        maxHeight: 400,
                                        overflow: "auto",
                                        border: "1px solid #ddd",
                                        borderRadius: 1,
                                        backgroundColor: "#f9f9f9"
                                    }}
                                >
                                    {comments.map((comment, index) => (
                                        <div key={comment.id}>
                                            <ListItem
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start"
                                                }}
                                            >
                                                <ListItemText
                                                    primary={<strong>{comment.name}</strong>}
                                                    secondary={comment.email}
                                                />
                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                    {comment.body}
                                                </Typography>
                                            </ListItem>
                                            {index < comments.length - 1 && <Divider />}
                                        </div>
                                    ))}
                                </List>
                            ) : (
                                <Typography color="textSecondary">
                                    No hay comentarios
                                </Typography>
                            )}
                        </Grid>
                    </Grid>

                    {/* BOTÓN PUT */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleGuardar}
                    >
                        Guardar Cambios
                    </Button>

                    {/* BOTÓN POST */}
                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        onClick={handleAgregar}
                    >
                        Agregar Nuevo Post
                    </Button>

                    {/* VOLVER */}
                    <Button
                        variant="outlined"
                        color="secondary"
                        component="a"
                        href="/posts"
                        fullWidth
                    >
                        Volver al listado de posts
                    </Button>

                </CardContent>
            </Card>
        </Box>
    )
}

export default PostDetalle;
