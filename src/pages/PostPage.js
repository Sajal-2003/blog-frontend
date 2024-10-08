import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

const PostPage = () => {
  const { userInfo } = useContext(UserContext);

  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`http://localhost:8000/api/auth/post/${id}`);

      setPostInfo(res);
    };
    getPost();
  }, [id]);

  if (!postInfo) return "";

  return (
    <div className="post-page">
      <h1>{postInfo.data.title}</h1>
      <time>{formatISO9075(new Date(postInfo.data.createdAt))}</time>
      <div className="author">by @{postInfo.data.author.username}</div>

      {userInfo.id === postInfo.data.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo.data._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit this post
          </Link>
        </div>
      )}

      <div className="image">
        <img src={`http://localhost:8000/${postInfo.data.cover}`} alt="" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.data.content }}
      />
    </div>
  );
};

export default PostPage;
