import React, { useState, useEffect } from "react";
import { createPosts, updatePosts } from "../services/postService";

export default function PostForm({ posts, setPosts, editPost, setEditPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editPost) {
      setTitle(editPost?.title || "");  
      setBody(editPost?.body || "");    
    } else {
      setTitle("");
      setBody("");
    }
  }, [editPost]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editPost) {
      updatePost();
    } else {
      addPost();
    }

    setTitle("");
    setBody("");
    setEditPost(null);
  };

  const updatePost = () => {
    updatePosts(editPost.id, { title, body })
      .then((response) => {
        setPosts(posts.map((post) => (post.id === editPost.id ? response.data : post)));
        setEditPost(null); 
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addPost = () => {
    createPosts({ title, body })
      .then((response) => {
        setPosts([...posts, response.data]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>Title</div>
      <input
        value={title}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>Body</div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div>
        <button type="submit">{editPost ? "Edit Post" : "Add Post"}</button>
      </div>
    </form>
  );
}