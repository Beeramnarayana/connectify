import api from "../config/axios.js";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchPostsFunction, setFetchPostsFunction] = useState(null);

  async function registerUser(formdata, navigate, fetchPosts) {
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/register", formdata);

      toast.success(data.message);
      setIsAuth(true);
      setUser(data.user);
      navigate("/");
      setLoading(false);
      // Call fetchPosts after successful registration
      if (fetchPosts) {
        fetchPosts();
      }
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Registration failed';
      toast.error(message);
      setLoading(false);
    }
  }

  async function loginUser(email, password, navigate, fetchPosts) {
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/login", {
        email,
        password,
        navigate,
      });

      toast.success(data.message);
      setIsAuth(true);
      setUser(data.user);
      navigate("/");
      setLoading(false);
      // Call fetchPosts after successful login
      if (fetchPosts) {
        fetchPosts();
      }
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Login failed';
      toast.error(message);
      setLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await api.get("/api/user/me");

      setUser(data);
      setIsAuth(true);
      setLoading(false);
      // If we have a fetchPosts function, call it after successful authentication
      if (fetchPostsFunction) {
        fetchPostsFunction();
      }
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setLoading(false);
    }
  }

  async function logoutUser(navigate) {
    try {
      const { data } = await api.get("/api/auth/logout");

      if (data.message) {
        toast.success(data.message);
        setUser([]);
        setIsAuth(false);
        navigate("/login");
      }
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Logout failed';
      toast.error(message);
    }
  }

  async function followUser(id, fetchUser) {
    try {
      const { data } = await api.post("/api/user/follow/" + id);

      toast.success(data.message);
      fetchUser();
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Follow failed';
      toast.error(message);
    }
  }

  async function updateProfilePic(id, formdata, setFile) {
    try {
      const { data } = await api.put("/api/user/" + id, formdata);
      toast.success(data.message);
      fetchUser();
      setFile(null);
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Update failed';
      toast.error(message);
    }
  }
  async function updateProfileName(id, name, setShowInput) {
    try {
      const { data } = await api.put("/api/user/" + id, { name });
      toast.success(data.message);
      fetchUser();
      setShowInput(false);
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Update failed';
      toast.error(message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [fetchPostsFunction]);
  return (
    <UserContext.Provider
      value={{
        loginUser,
        isAuth,
        setIsAuth,
        user,
        setUser,
        loading,
        logoutUser,
        registerUser,
        followUser,
        updateProfilePic,
        updateProfileName,
        setFetchPostsFunction,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
