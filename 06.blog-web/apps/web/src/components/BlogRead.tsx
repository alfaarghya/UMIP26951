import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { Delete, Update } from "./ChangeBtn";
import { api } from "../utils/api";
import { BlogCardType, CommentType } from "@blog-web/types/client";


const BlogRead = ({ username, id, title, content }: BlogCardType) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const currentUser = localStorage.getItem("username");

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/comment/${id}`);
        setComments(res.data.comments);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };
    fetchComments();
  }, [id]);

  // Post comment
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await api.post(`/comment/${id}`, {
        comment: newComment,
      });

      setComments((prev) => [res.data.comment, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  return (
    <div className="grid grid-cols-12 w-full px-10 pt-5 max-w-screen-2xl">
      {/* Main Blog Content */}
      <div className="col-span-8">
        <div className="text-2xl font-extrabold mb-5">{title}</div>
        <div className="text-xl mb-8">{content}</div>

        {/* Comment Input */}
        {currentUser && (
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded resize-none"
              rows={3}
              placeholder="Write a comment..."
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Post Comment
            </button>
          </div>
        )}

        {/* Comment List */}
        <div className="mt-6">
          <div className="text-lg font-semibold mb-3">Comments</div>
          {comments.length === 0 ? (
            <div className="text-gray-500">No comments yet.</div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="mb-4 p-3 border-b border-gray-400 rounded">
                <div className="text-sm text-gray-700 font-semibold mb-1">
                  @{comment.user.username}
                </div>
                <div className="text-gray-800">{comment.comment}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(comment.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-span-4 ml-6">
        <div className="mb-2">Author</div>
        <div className="mb-10">
          <div className="flex items-center gap-2">
            <Avatar username={username} />
            <div className="font-bold text-gray-600">@{username}</div>
          </div>
          <div className="text-gray-400">Hii I am a user of Blog-Web</div>
        </div>

        {username === currentUser && (
          <div className="flex gap-2">
            <Update id={id} title={title} content={content} />
            <Delete id={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogRead;
