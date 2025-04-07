import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import CreatePost from "./pages/CreatePost";

export type Post = {
  title: string;
  postText: string;
  username: string;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">Home Page</Link>
        <Link to="/createpost">Create Post</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
