import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { Delete, Update } from "./ChangeBtn";
import { BlogCardType } from "@blog-web/types/client";

const BlogCard = ({ username, id, title, content }: BlogCardType) => {
  return (
    <div className="w-4/6 bg-white border border-gray-200 rounded-lg shadow px-4 py-3 mb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar username={username} />
          <div className="font-extralight cursor-pointer">@{username}</div>
        </div>
        {username === localStorage.getItem("username") ? (
          <div className="flex ">
            <Update id={id} title={title} content={content} />
            <Delete id={id} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <Link to={`/blog/${id}`}>
        <div className="p-5 cursor-pointer">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 ">
            {content.length < 100 ? content : `${content.slice(0, 100)} . . .`}
          </p>
        </div>
      </Link>
      <p className="text-gray-400 text-sm">{`${Math.ceil(
        content.length / 100
      )} minute(s) read`}</p>
    </div>
  );
};

export default BlogCard;
