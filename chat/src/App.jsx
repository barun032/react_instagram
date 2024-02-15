import { useEffect, useState } from "react";
import "./index.css";
import demo from "./components/Assets/demo.jpg";

import io from "socket.io-client";
import { Form } from "./components/Form/Form";
import { Post } from "./components/Post/Post";

const socket = io.connect("http://localhost:3001");

function App() {
  const [allPost, setAllPost] = useState([
    {
      title: "This is the sample title",
      image: demo,
      likes: 0,
      comments: [],
    },
  ]);

  const handleSubmit = (data) => {
    socket.emit("share_post", data);
  };

  const handleHeartClick = (index) => {
    socket.emit("send_likes", index);
  };

  const handleCommentClick = (index) => {
    console.log(index);
  };

  const comentFormSubmitHandle = (comment, index) => {
    socket.emit("send_comment", comment, index);
  };

  useEffect(() => {
    socket.on("recieve_post", (data) => {
      const blob = new Blob([data.image]);
      const imageURL = URL.createObjectURL(blob);
      setAllPost((prev) => [
        ...prev,
        { title: data.title, image: imageURL, likes: 0, comments: [] },
      ]);
    });

    socket.on("recieve_likes", (index) => {
      setAllPost((prev) => {
        const updatedPost = [...prev];
        updatedPost[index] = {
          ...updatedPost[index],
          likes: updatedPost[index].likes + 1,
        };

        return updatedPost;
      });
    });

    socket.on("recieve_comment", (comment, index) => {
      setAllPost((prev) => {
        const updatedPost = [...prev];
        updatedPost[index] = {
          ...updatedPost[index],
          comments: [...updatedPost[index].comments, comment],
        };

        return updatedPost;
      });
    });
  }, [socket]);

  return (
    <>
      <div className="w-[100%] h-[100vh] items-start justify-center flex gap-5 p-5 overflow-auto flex-col-reverse sm:flex-row">
        <div className="flex-1 border p-5 lg:pl-40">
          <Post
            allPost={allPost}
            onHeartClick={handleHeartClick}
            onCommentClick={handleCommentClick}
            onCommentFormSubmit={comentFormSubmitHandle}
          />
        </div>

        <div className="self-start border p-5 lg:fixed lg:right-14 lg:top-16">
          <Form onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}

export default App;
