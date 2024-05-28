import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

export default function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  useEffect(() => {
    const pro = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/auth/post/${id}`
      );
      console.log(res);
      setTitle(res.data.title);
      setContent(res.data.content);
      setSummary(res.data.summary);
    };
    pro();
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await axios.put(
      "http://localhost:8000/api/auth/post",
      data,
      { withCredentials: true }
    );
    // console.log(response);
    if (response.status === 200) {
      message.success("Post edit Successfully");
      navigate(`/post/${id}`);
    }
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  );
}
