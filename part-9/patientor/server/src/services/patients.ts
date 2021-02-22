import patients from "../../data/patients";
import { Patient, PublicPatient, NewPatient, Entry } from "../../types";
import { generateId } from "../../utils";

const getPatientInfo = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientInfo = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: generateId() };
  patients.push(newPatient);
  return newPatient;
};

const findPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addEntry = (entry: Entry, patientId: string): Entry => {
  const newEntry = { ...entry, id: generateId() };
  const patientIndex = patients.findIndex(
    (patient) => patient.id === patientId
  );

  if (patientIndex < 0) {
    throw new Error("No patient with the specified ID");
  }

  patients[patientIndex].entries.push(newEntry);
  return newEntry;
};

export default {
  getPatientInfo,
  getNonSensitivePatientInfo,
  addPatient,
  findPatientById,
  addEntry,
};
