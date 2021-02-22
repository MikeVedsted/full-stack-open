import express from "express";
import cors from "cors";
import diagnosesRouter from "./routers/diagnoses";
import patientsRouter from "./routers/patients";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnosis", diagnosesRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
