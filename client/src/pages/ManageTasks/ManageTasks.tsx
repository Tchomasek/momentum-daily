import axios from "axios";
import { TaskType } from "../../types";
import { API_URL } from "../../api_url";
import { useEffect, useState } from "react";
import "./ManageTasks.scss";

function CreateTask() {
  const [listOfTasks, setListOfTasks] = useState<TaskType[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  useEffect(() => {
    axios.get(`${API_URL}/tasks`).then((response) => {
      const listOfTasks: any = response.data.map((task: any) => {
        return task;
      });
      setListOfTasks(listOfTasks);
    });
  }, []);

  const onSubmit = () => {
    const data = { title: newTaskTitle };
    console.log(data);
    axios.post(`${API_URL}/tasks`, data);
    setListOfTasks((prev) => {
      return [...prev, data];
    });
    setNewTaskTitle("");
  };

  const handleDeleteTask = (task: TaskType) => {
    axios.delete(`${API_URL}/tasks/${task.title}`);
    setListOfTasks((prev) => {
      return prev.filter((t) => t.id !== task.id);
    });
  };

  return (
    <div className="manage-tasks-page">
      <h1>Create new task</h1>
      <div className="form-container">
        <input
          autoComplete="off"
          id="inputCreateTask"
          name="title"
          placeholder="Title of task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button type="submit" onClick={onSubmit}>
          Create Task
        </button>
      </div>
      <h2>List of tasks:</h2>
      <div className="tasks-list">
        {listOfTasks.map((task: TaskType) => {
          let taskDate: string = "N/A";
          if (task.createdAt) {
            taskDate = new Date(task.createdAt).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
            // if task was just created, it doesnt have a createdAt date yet, use current date
          } else {
            taskDate = new Date().toLocaleDateString("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
          }
          return (
            <div key={task.id || task.title} className="task-container">
              <div>
                <div className="taskTitle">Task: {task.title}</div>
                <div className="taskDate">
                  Date of creation: {taskDate}
                </div>{" "}
              </div>
              <button onClick={() => handleDeleteTask(task)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CreateTask;
