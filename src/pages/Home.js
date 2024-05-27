import React, { useEffect, useState } from "react";
import Post from "../Components/Post";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getHome = async () => {
      let res = await axios.get(
        "https://blog-backend-qlco.onrender.com/api/auth/getpost"
      );
      setPosts(res.data);
    };
    getHome();
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
};

export default Home;
