import api from "../config/axios.js";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserData } from "./UserContext.jsx";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setFetchPostsFunction } = UserData();

  async function fetchPosts() {
    try {
      const { data } = await api.get("/api/post/all");

      setPosts(data.posts);
      setReels(data.reels);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const [addLoading, setAddLoading] = useState(false);

  async function addPost(formdata, setFile, setFilePrev, setCaption, type) {
    setAddLoading(true);
    try {
      const { data } = await api.post("/api/post/new?type=" + type, formdata);

      toast.success(data.message);
      fetchPosts();
      setFile("");
      setFilePrev("");
      setCaption("");
      setAddLoading(false);
    } catch (error) {
      const message = error.response.data.message || error?.message || 'Add post failed';
      toast.error(message);
      setAddLoading(false);
    }
  }

  async function likePost(id) {
    try {
      const { data } = await api.post("/api/post/like/" + id);

      toast.success(data.message);
      fetchPosts();
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Like failed';
      toast.error(message);
    }
  }

  async function addComment(id, comment, setComment, setShow) {
    try {
      const { data } = await api.post("/api/post/comment/" + id, {
        comment,
      });
      toast.success(data.message);
      fetchPosts();
      setComment("");
      setShow(false);
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Comment failed';
      toast.error(message);
    }
  }

  async function deletePost(id) {
    setLoading(true);
    try {
      const { data } = await api.delete("/api/post/" + id);

      toast.success(data.message);
      fetchPosts();
      setLoading(false);
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Delete failed';
      toast.error(message);
      setLoading(false);
    }
  }

  async function deleteComment(id, commentId) {
    try {
      const { data } = await api.delete(
        `/api/post/comment/${id}?commentId=${commentId}`
      );

      toast.success(data.message);
      fetchPosts();
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Delete comment failed';
      toast.error(message);
    }
  }

  useEffect(() => {
    // Register the fetchPosts function with UserContext
    setFetchPostsFunction(() => fetchPosts);
  }, [setFetchPostsFunction]);
  return (
    <PostContext.Provider
      value={{
        reels,
        posts,
        addPost,
        likePost,
        addComment,
        loading,
        addLoading,
        fetchPosts,
        deletePost,
        deleteComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const PostData = () => useContext(PostContext);