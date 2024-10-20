import { Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreatePost from "./pages/CreatePost";
import LogoutPage from "./pages/LogoutPage";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import DeletePost from "./pages/DeletePost";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/delete/:id" element={<DeletePost />} />
      </Routes>
    </div>
  );
};

export default App;
