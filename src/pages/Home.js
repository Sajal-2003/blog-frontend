import React, { useEffect, useState } from "react";
import Post from "../Components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/auth/getpost").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
};

export default Home;
