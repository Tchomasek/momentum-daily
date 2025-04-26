import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TaskType } from "../types";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api_url";

function CreateTask() {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
  };

  const onSubmit = (data: TaskType) => {
    axios.post(`${API_URL}/tasks`, data).then(() => {
      navigate("/");
    });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
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
            <button type="submit">Create Task</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreateTask;
