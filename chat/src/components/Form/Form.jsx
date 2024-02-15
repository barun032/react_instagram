import React, { useState } from "react";

export const Form = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  // handeling the image upload
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5242880) {
        alert("Image size should be less than 5 mb!");
      } else {
        setImage(selectedFile);
      }
    } else {
      // Handle case where no file is selected or invalid file object
      alert("Invalid file selected");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, image };
    if(newPost.image){
      onSubmit(newPost);
    }else{
      alert("Selected image is not valid!");
    }

    setTitle("");
    setImage(null);
  };

  return (
    <div>
      <form className="flex flex-col flex-1 gap-3" onSubmit={handleSubmit}>
        <h2 className="mx-auto text-xl font-semibold text-slate-500">
          Create New Post
        </h2>
        <input
          className="py-2 px-3 border outline-none"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
        />
        <input
          className="py-2 px-3 border"
          type="file"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <button className="bg-green-500 text-white py-2 px-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
