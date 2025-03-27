import React, {useState, useEffect} from "react";
import { getPosts, deletePosts } from "../services/postService";
import PostForm from "./postForm";

export default function Posts(){

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
        .then(result => {
            setPosts(result.data)
        })
        .catch(err => {
            console.error(err)
        })
    }, []);

    const handleDelete = (id) => {
        deletePosts(id)
        .then((result) => {
            setPosts(posts.filter((post) => post.id !== id))
        })
        .catch(err => {
            console.error(err)
        })
    };
    
    return(
        <div>
            <h1>Posts</h1>
            <PostForm posts={posts} setPosts={setPosts}></PostForm>
            <ul>
                {
                    posts.map(post => (
                        <li key={post.id}>
                            <h2>{post.title}</h2>
                            <p> {post.body}</p>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}