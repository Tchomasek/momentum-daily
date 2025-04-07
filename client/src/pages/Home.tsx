import axios from "axios";
import { useEffect, useState } from "react";

type Post = {
  title: string;
  postText: string;
  username: string;
};

function Home() {
  const [listOfPosts, setListOfPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
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
