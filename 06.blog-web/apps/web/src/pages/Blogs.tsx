import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";

const Blog = () => {
  const { loading, blogs } = useBlogs(); //retrieve blogs using custom hook

  // can't load the blogs
  if (loading) {
    return <div>Loading . . . . </div>;
  }

  //load the blog
  return (
    <div>
      <Appbar />
      <div className="flex justify-center flex-col items-center mt-10">
        {blogs.map((blog) => (
          <BlogCard
            id={blog.id}
            username={blog.author.username}
            title={blog.title}
            content={blog.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
