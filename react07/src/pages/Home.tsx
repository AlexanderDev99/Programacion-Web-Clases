// Importar componentes de Material-UI para estilos y tipografía
import { Container, Typography } from "@mui/material";

// Componente Home: página principal de la aplicación
function Home() {
  return (
    <>
    
        {/* Contenedor con margen superior de 4 unidades */}
        <Container sx={{mt:4}}>
            {/* Título principal en formato h4 */}
            <Typography variant="h4" gutterBottom>
                Bienvenido
            </Typography>
            {/* Subtítulo en formato h6 */}
            <Typography variant="h6">
                Aplicación para consultar posts. 
            </Typography>
        </Container>
    </>
  );
}

// Exportar el componente Home como default
export default Home;
