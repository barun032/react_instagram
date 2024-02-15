import React, { useState } from "react";

const PostItem = ({
  title,
  image,
  likes,
  comments,
  index,
  onHeartClick,
  onCommentFormSubmit,
}) => {
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  const [isCommentVisivle, setIsCommentVisivle] = useState(false);

  const [commentFormData, setCommentFormData] = useState("");

  const handleHeartClick = (index) => {
    onHeartClick(index);
    setIsHeartPressed((prev) => !prev);
  };

  const handleCommentClick = () => {
    setIsCommentVisivle((prev) => !prev);
  };

  const handleCommentFormSubmit = (e) => {
    e.preventDefault();
    onCommentFormSubmit(commentFormData, index);
    setCommentFormData("");
  };

  return (
    <div className="border bg-slate-50 p-3 mb-5 transition duration-1000 ease-in">
      <div className="text-slate-500">{title}</div>
      <div className="h-[300px] flex items-center overflow-hidden">
        <img src={image} alt="post" />
      </div>
      <div className="flex items-center mt-2 gap-3 text-slate-600">
        <div className="flex gap-1 items-center">
          <i
            onClick={() => handleHeartClick(index)}
            className={`${
              isHeartPressed ? "fa-solid" : "fa-regular"
            } fa-heart cursor-pointer`}
          ></i>
          <span>{likes}</span>
        </div>
        <div className="flex gap-1 items-center">
          <i
            onClick={() => handleCommentClick()}
            className={`${
              isCommentVisivle ? "fa-solid" : "fa-regular"
            } fa-comment cursor-pointer`}
          ></i>
          <span>{comments.length}</span>
        </div>
      </div>

      <div className={`${isCommentVisivle ? "block" : "hidden"} mt-3`}>
        <form onSubmit={handleCommentFormSubmit} className="flex">
          <input
            className="border px-4 py-1 outline-none rounded-l-3xl text-sm"
            type="text"
            placeholder="add your comment"
            onChange={(e) => setCommentFormData(e.target.value)}
            value={commentFormData}
          />
          <button
            type="submit"
            className="bg-slate-400 text-white px-2 py-1 rounded-r-3xl"
          >
            comment
          </button>
        </form>
        <h2 className="mt-3">{comments.length <= 0?"You have no Comments!":"All Comments"}</h2>
        <ul className="text-sm text-slate-500">
          {comments.map((item, idx) => (
            <li className="border w-fit px-2 py-1 mb-1" key={idx}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostItem;
