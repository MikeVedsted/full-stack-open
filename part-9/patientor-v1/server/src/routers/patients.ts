import express from "express";
import patientService from "../services/patients";
import toNewPatient from "../../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatientInfo());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findPatientById(req.params.id);
  patient ? res.send(patient) : res.sendStatus(404);
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default router;
