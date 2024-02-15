import React from "react";
import PostItem from "../PostItem/PostItem";

export const Post = ({ allPost, onHeartClick, onCommentClick, onCommentFormSubmit }) => {
  const heartClickHandle = (index) => {
    onHeartClick(index);
  };
  const commentClickHandle = (index) => {
    onCommentClick(index);
  }
  const commentFormSubmitHandle = (comment, index)=>{
    onCommentFormSubmit(comment, index);
  }

  return (
    <div>
      <div>
        <h1 className="text-xl text-slate-500">Here will be all the post</h1>
      </div>
      {allPost.map((post, index) => (
        <PostItem
          key={index}
          title={post.title}
          image={post.image}
          index={index}
          likes={post.likes}
          comments={post.comments}
          onHeartClick={heartClickHandle}
          onCommentClick={commentClickHandle}
          onCommentFormSubmit={commentFormSubmitHandle}
        />
      ))}
    </div>
  );
};
