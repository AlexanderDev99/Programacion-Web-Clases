import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import PostDetalle from "./pages/PostDetalle";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import UserDetalle from "./pages/UserDetalle";
import UserPosts from "./pages/UserPosts";
import UserTodos from "./pages/UserTodos";
import UserAlbums from "./pages/UserAlbums";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/post" element={<Posts/>} />
        <Route path="/post/:id" element={<PostDetalle/>}/>
        <Route path="/usuarios" element={<Users/>} />
        <Route path="/usuarios/:id" element={<UserDetalle/>} />
        <Route path="/usuarios/:id/posts" element={<UserPosts/>} />
        <Route path="/usuarios/:id/todos" element={<UserTodos/>} />
        <Route path="/usuarios/:id/albums" element={<UserAlbums/>} />
      </Routes>
    </>
  );
}

export default App;
