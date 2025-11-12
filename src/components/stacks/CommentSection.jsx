import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaReply } from "react-icons/fa";

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  // Recursive nested comments
  const renderComments = (list, depth = 0) =>
    list.map((comment, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2"
        style={{ marginLeft: depth * 20 }}
      >
        <div className="p-2 bg-gray-900 rounded-lg border border-gray-700">
          <p className="text-sm">{comment.text}</p>
          <button
            className="text-xs text-blue-400 mt-1 flex items-center gap-1"
            onClick={() => handleReply(comment.id)}
          >
            <FaReply size={10} /> Reply
          </button>
        </div>
        {comment.replies && renderComments(comment.replies, depth + 1)}
      </motion.div>
    ));

  const handleAddComment = () => {
    if (input.trim() === "") return;
    setComments([...comments, { id: Date.now(), text: input, replies: [] }]);
    setInput("");
  };

  const handleReply = (id) => {
    const replyText = prompt("Enter your reply:");
    if (!replyText) return;

    const addReply = (list) =>
      list.map((c) => {
        if (c.id === id)
          return { ...c, replies: [...c.replies, { id: Date.now(), text: replyText, replies: [] }] };
        return { ...c, replies: addReply(c.replies) };
      });

    setComments(addReply(comments));
  };

  return (
    <div className="mt-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-sm"
        />
        <button
          onClick={handleAddComment}
          className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 text-sm"
        >
          Add
        </button>
      </div>
      <div className="mt-3">{renderComments(comments)}</div>
    </div>
  );
}
