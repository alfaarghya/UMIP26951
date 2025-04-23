import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { BlogType } from "@blog-web/types/client";

//custom hook for retrieving all blogs
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    api
      .get(`/blog`)
      .then((response) => {
        setBlogs(response.data.blog);
        setLoading(false);
      })
      .catch((err) => { });
  }, []);

  return {
    loading,
    blogs,
  };
};

//custom hook for retrieving blog
export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogType>();

  useEffect(() => {
    api
      .get(`/blog/${id}`)
      .then((response) => {
        setBlog(response.data.blog);
        setLoading(false);
      })
      .catch((err) => { });
  }, [id]);

  return {
    loading,
    blog,
  };
};
