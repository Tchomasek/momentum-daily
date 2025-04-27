import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api_url";
import { WHOLE_DAY_COMPLETION_NAME } from "../../global_vars";
import "./Home.scss";

function Home() {
  let navigate = useNavigate();

  const [wholeDaysCompletion, setWholeDaysCompletion] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/completions/tasks/${WHOLE_DAY_COMPLETION_NAME}`)
      .then((response) => {
        const listOfWholeDaysCompletion: string[] = response.data.map(
          (completion: any) => {
            return completion.date;
          }
        );
        setWholeDaysCompletion(listOfWholeDaysCompletion);
      });
  }, []);

  const days = [
    "2025.04.21",
    "2025.04.22",
    "2025.04.23",
    "2025.04.24",
    "2025.04.25",
    "2025.04.26",
    "2025.04.27",
  ];

  const handleDayClick = (day: string) => {
    navigate(`/day/${day}`);
  };

  return (
    <div className="calendar">
      {days.map((day, index) => (
        <div
          className={
            "day" + (wholeDaysCompletion.includes(day) ? " complete" : "")
          }
          key={index}
          onClick={() => handleDayClick(day)}
        >
          {new Date(day).getDate()}
        </div>
      ))}
    </div>
  );
}

export default Home;
