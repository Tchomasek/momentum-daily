const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const taskRouter = require("./routes/Tasks");
app.use("/tasks", taskRouter);
const completionsRouter = require("./routes/Completions");
app.use("/completions", completionsRouter);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("Server running on port 3001");
  });
});
