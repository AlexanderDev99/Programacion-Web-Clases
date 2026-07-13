// Importar componentes necesarios de Material-UI
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

// Componente NavBar que representa la barra de navegación de la aplicación
function NavBar() {
    return (
        <>
            {/* AppBar es la barra superior con posición estática */}

            <AppBar position="static">
                {/* Toolbar contiene los elementos de la barra de navegación */}
                <Toolbar>
                    {/* Título principal de la aplicación */}
                    <Typography variant="h6"  component="div" sx={{ flexGrow: 1 }}>
                        Mi Aplicación
                    </Typography>

                    {/* Botones de navegación */}
                    <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon/>}>Inicio</Button>
                    <Button color="inherit" component={Link} to="/estudiantes">Estudiantes</Button>
                    <Button color="inherit" component={Link} to="/cursos">Cursos</Button>
                    <Button color="inherit" component={Link} to="/matriculas">Matrículas</Button>
                </Toolbar>
            </AppBar>
        </>
    );
}
// Exportar el componente NavBar por defecto
export default NavBar;
