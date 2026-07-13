import './App.css'
import { Routes, Route } from "react-router-dom";
import { EstudiantesPage } from "./pages/EstudiantesPage.tsx";
import { CursosPage } from "./pages/CursosPage.tsx";
import { MatriculasPage } from "./pages/MatriculasPage.tsx";
import NavBar from "./components/NavBar.tsx";

function App() {
  return (
    <>
        <NavBar/>
        <Routes>
            <Route path="/" element={<h2>Bienvenido al Sistema de Academia</h2>} />
            <Route path="/estudiantes" element={<EstudiantesPage />} />
            <Route path="/cursos" element={<CursosPage />} />
            <Route path="/matriculas" element={<MatriculasPage />} />
        </Routes>
    </>
  );
}

export default App
