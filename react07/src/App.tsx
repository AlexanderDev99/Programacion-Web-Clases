import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import { ThemeProvider } from "@emotion/react";
import PostDetalle from "./pages/PostDetalle";
import Posts from "./pages/Posts";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/post" element={<Posts/>} />
        <Route path="/post/id" element={<PostDetalle/>}/>
      </Routes>
    </>
  );
}

export default App;
