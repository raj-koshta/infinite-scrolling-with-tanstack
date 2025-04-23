import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

// To fetching the data // old way
export const fetchPosts = () => {
    return api.get("/posts")
}

// RQ way
export const fetchPostsRQ = async (pageNumber) => {
    try {
        const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`)
        return res.status === 200 ? res.data : []
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchPostDeatil = async (id)=>{
    try {
        const res = await api.get(`/posts/${id}`)
        return res.status === 200 ? res.data : [];
    } catch (error) {
        console.log(error.message);
    }
}

// to detele the post

export const deletePost = (id) => {
    return api.delete(`/posts/${id}`)
}

//to update the post

export const updatePost = (id) =>{
    return api.patch(`/posts/${id}`, {title: "I have updated"});
}

// Infinite-scrolling

export const fetchUsers = async ({pageParam = 1})=>{
    try {
        const res = await axios.get(`https://api.github.com/users?per_page=10&page=${pageParam}`)
        return res.data;
    } catch (error) {
       console.log(error); 
    }
}