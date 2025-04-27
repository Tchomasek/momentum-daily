import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../api_url";
import "./Day.scss";
import { WHOLE_DAY_COMPLETION_NAME } from "../../global_vars";
import { CompletionType, TaskType } from "../../types";
import { isBefore } from "date-fns";

function Day() {
  let { date } = useParams<{ date: string }>();
  const [listOfTasks, setListOfTasks] = useState<TaskType[]>([]);
  const [listOfCompletions, setListOfCompletions] = useState<CompletionType[]>(
    []
  );
  const [dayCompleted, setDayCompleted] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`${API_URL}/tasks`).then((response) => {
      const listOfTasks: any = response.data.map((task: any) => {
        return task;
      });
      setListOfTasks(listOfTasks);
    });
    axios.get(`${API_URL}/completions/${date}`).then((response) => {
      const listOfCompletedTasks: any = response.data.map((completion: any) => {
        return completion;
      });
      setListOfCompletions(listOfCompletedTasks);
    });
  }, [date]);

  const cachedIsTaskInCompletions = useCallback(
    (task: TaskType) => {
      for (let completion of listOfCompletions) {
        if (completion.task === task.title) {
          return true;
        }
      }
      return false;
    },
    [listOfCompletions]
  );

  useEffect(() => {
    if (date) {
      const currentDate = new Date(date);
      for (let task of listOfTasks) {
        const dateOftaskCreation = new Date(task.createdAt || "");
        if (isBefore(currentDate, dateOftaskCreation)) {
          // task.notRelevant = true;
        }
      }
    }

    // check if ammount of tasks is higher that ammount of completions as a shortcut
    if (listOfTasks.length > listOfCompletions.length) {
      setDayCompleted(false);
      return;
    }

    // check if all tasks are in completions
    for (let task of listOfTasks) {
      if (!cachedIsTaskInCompletions(task)) {
        setDayCompleted(false);
        return;
      }
      setDayCompleted(true);
    }
    // eslint-disable-next-line
  }, [
    listOfCompletions,
    listOfTasks,
    date,
    dayCompleted,
    cachedIsTaskInCompletions,
  ]);

  useEffect(() => {
    const completion = {
      date: date || "",
      task: WHOLE_DAY_COMPLETION_NAME,
    };
    if (!dayCompleted) {
      axios.delete(
        `${API_URL}/completions/${WHOLE_DAY_COMPLETION_NAME}/${date}`
      );
    } else {
      axios.post(`${API_URL}/completions`, completion);
    }
  }, [dayCompleted, date]);

  const taskClick = (task: string, completed: boolean) => {
    const completion: CompletionType = {
      date: date || "",
      task: task,
    };
    if (!completed) {
      axios.post(`${API_URL}/completions`, completion);
      const newListOfCompletions = [...listOfCompletions, completion];
      setListOfCompletions(newListOfCompletions);
    } else {
      axios.delete(`${API_URL}/completions/${task}/${date}`);
      const newListOfCompletions = listOfCompletions.filter(
        (completion) => completion.task !== task
      );
      setListOfCompletions(newListOfCompletions);
    }
  };

  return (
    <div
      className={
        "day-container" + (dayCompleted ? " complete-day" : " incomplete-day")
      }
    >
      <h1 className="day-title">{date}</h1>
      <div className="day-tasks">
        {listOfTasks.map((task: TaskType, index: number) => {
          const completed = cachedIsTaskInCompletions(task);
          return (
            <div
              className={
                (completed && !task.notRelevant
                  ? "completed-task"
                  : "not-completed-task") +
                (task.notRelevant ? " not-relevant" : "")
              }
              key={index}
              onClick={() => taskClick(task.title, completed)}
            >
              <h2>{task.title}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Day;
