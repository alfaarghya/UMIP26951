import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* all routes */}
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/updateBlog" element={<UpdateBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
