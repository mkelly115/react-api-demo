import axios from "axios";

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

const getPosts = () => api.get('/posts');

const deletePosts = (id) => api.delete(`/posts/${id}`);

const createPosts = (post) => api.post('/posts', post);

const updatePosts = (id, post) => api.put(`/posts/${id}`, post)

export { getPosts, deletePosts, createPosts, updatePosts };