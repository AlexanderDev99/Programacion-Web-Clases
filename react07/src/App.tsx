import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts";
import { ThemeProvider } from "@emotion/react";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/post" element={<Posts />} />
      </Routes>
    </>
  );
}

export default App;
