import { useState } from "react";
import Appbar from "../components/Appbar";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { UpdatePostType } from "@blog-web/types/client";

const UpdateBlog = () => {
  // first load the data from local storage & update them with new data
  const [updatePost, setUpdatePost] = useState<UpdatePostType>({
    title: localStorage.getItem("blogTitle") || "",
    content: localStorage.getItem("blogContent") || "",
    id: localStorage.getItem("blogId") || "",
  });

  //navigate to other page
  const navigate = useNavigate();

  const sendRequest = async () => {
    try {
      const id = localStorage.getItem("blogId") || ""
      //send request to server
      const response = await api.put(`/blog/${id}`, updatePost,);

      const postId = response.data.blog.id;

      //free up the local storage
      localStorage.removeItem("blogTitle");
      localStorage.removeItem("blogContent");
      localStorage.removeItem("blogId");
      navigate(`/blog/${postId}`);
    } catch (err) {
      console.log(err);
      alert("Invalid inputs");
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center flex-col items-center mt-10">
        <div className="w-4/6 ">
          <div className="mb-6 flex items-center">
            <label className="block text-2xl font-bold text-gray-900 mr-4">
              Title
            </label>
            <input
              value={updatePost.title}
              onChange={(e) => {
                setUpdatePost({
                  ...updatePost,
                  title: e.target.value,
                });
              }}
              type="text"
              id="large-input"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 "
            />
          </div>
          <div className="flex mb-6">
            <label className="block text-2xl font-bold text-gray-900 mr-4">
              Content
            </label>
            <textarea
              value={updatePost.content}
              onChange={(e) => {
                setUpdatePost({
                  ...updatePost,
                  content: e.target.value,
                });
              }}
              rows={15}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
        </div>
        <div>
          <button
            onClick={sendRequest}
            type="button"
            className=" text-white bg-[#2ec27d] hover:bg-[#2ec27d]/60 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2 text-lg text-center me-2 w-40"
          >
            Re-Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
