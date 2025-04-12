import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CommentType, PostType } from "../types";
import { API_URL } from "../api_url";

function Post() {
  let { id } = useParams<{ id: string }>();
  const [postObject, setPostObject] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    axios.get(`${API_URL}/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`${API_URL}/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    if (newComment === "") {
      alert("Please enter a comment.");
      return;
    }
    axios
      .post(`${API_URL}/comments`, {
        commentBody: newComment,
        PostId: id,
      })
      .then(() => {
        if (id) {
          const commentToAdd: CommentType = {
            commentBody: newComment,
            postId: id,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject?.title}</div>
          <div className="body">{postObject?.postText}</div>
          <div className="footer">{postObject?.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment"
            autoComplete="off"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>Submit</button>
        </div>
        <div className="listOfComments">
          {comments?.map((comment, index) => {
            return (
              <div key={index} className="comment">
                <div className="commentBody">{comment.commentBody}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
