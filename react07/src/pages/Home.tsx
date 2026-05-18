import { Container, Typography } from "@mui/material";

function Home() {
  return (
    <>
        <Container sx={{mt:4}}>
            <Typography variant="h4" gutterBottom>
                Bienvenido
            </Typography>
            <Typography variant="h6">
                Aplicación para consultar posts. 
            </Typography>
        </Container>
    </>
  );
}
export default Home;