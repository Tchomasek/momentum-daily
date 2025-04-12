import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api_url";
type Post = {
  id: number;
  title: string;
  postText: string;
  username: string;
};

function Home() {
  const [listOfPosts, setListOfPosts] = useState<Post[]>([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/posts`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  const onClick = (id: number): any => {
    navigate(`/post/${id}`);
  };

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post" onClick={() => onClick(value.id)}>
            <div className="title">{value.title}</div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
