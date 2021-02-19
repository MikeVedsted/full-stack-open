import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercise from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.status(400).json({ error: "Please provide both height and weight" });
  }

  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.status(400).json({ error: "Height and weight should both be numbers" });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);

  res.status(200).json({ height, weight, bmi });
});

type ExerciseModel = {
  target?: number;
  daily_exercises?: Array<number>;
};

app.post("/exercises", (req, res) => {
  const { target, daily_exercises } = req.body as ExerciseModel;

  if (!target || !daily_exercises) {
    res.json({ error: "Parameter missing" }).status(400);
  }

  if (
    target &&
    daily_exercises &&
    !isNaN(Number(target)) &&
    Array.isArray(daily_exercises)
  ) {
    res.status(200).json(calculateExercise([target, ...daily_exercises]));
  }
  res.json({ error: "Malformatted parameters" }).status(400);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
