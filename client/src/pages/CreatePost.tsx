import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Post } from "../App";
import * as Yup from "yup";

function CreatePost() {
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const onSubmit = (data: Post) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      console.log(response.data);
    });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  return (
    <div>
      <div className="createPostPage">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>Title: </label>
            <ErrorMessage name="title" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="title"
              placeholder="Title"
            />
            <label>Post: </label>
            <ErrorMessage name="postText" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="postText"
              placeholder="Text"
            />
            <label>Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="Username"
            />
            <button type="submit">Create Post</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreatePost;
