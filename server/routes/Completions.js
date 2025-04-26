const express = require("express");
const router = express.Router();
const { Completions } = require("../models");

router.get("/", async (req, res) => {
  const listOfCompletions = await Completions.findAll();
  res.json(listOfCompletions);
});

router.get("/:day", async (req, res) => {
  const day = req.params.day;
  const listOfCompletions = await Completions.findAll({ where: { date: day } });
  res.json(listOfCompletions);
});

router.get("/tasks/:task", async (req, res) => {
  const task = req.params.task;
  const listOfCompletions = await Completions.findAll({ where: { task } });
  res.json(listOfCompletions);
});

router.post("/", async (req, res) => {
  const completion = req.body;
  await Completions.create(completion);
  res.json(completion);
});

router.delete("/:task/:day", async (req, res) => {
  const task = req.params.task;
  const day = req.params.day;

  await Completions.destroy({
    where: {
      task,
      date: day,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
