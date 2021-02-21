import patients from "../../data/patients";
import { Patient, NonSensitivePatientInfo, NewPatient } from "../../types";
import { generateId } from "../../utils";

const getPatientInfo = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {
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

export default {
  getPatientInfo,
  getNonSensitivePatientInfo,
  addPatient,
  findPatientById,
};
