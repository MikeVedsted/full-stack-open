import {
  NewPatient,
  Gender,
  Entry,
  EntryType,
  HealthCheckRating,
  HealthCheckEntry,
  SickLeave,
  OccupationalHealthcareEntry,
  HospitalEntry,
  Discharge,
} from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const randomLetter = (): string => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

const randomNumber = (count: number): number => {
  return Math.floor(Math.random() * Math.pow(10, count));
};

export const generateId = (): string => {
  const id = `${randomLetter()}${randomNumber(7)}-${randomNumber(
    1
  )}${randomLetter()}${randomNumber(1)}${randomLetter()}-${randomNumber(
    3
  )}${randomLetter()}${randomNumber(1)}${randomLetter()}${randomNumber(6)}`;
  return id;
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Name missing or incorrect format" + `${name as string}`);
  }
  return name;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(
      "Occupation missing or incorrect format" + `${occupation as string}`
    );
  }
  return occupation;
};

const parseEmployer = (employer: any): string => {
  if (!employer || !isString(employer)) {
    throw new Error(
      "Employer missing or incorrect format" + `${employer as string}`
    );
  }
  return employer;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dob: any): string => {
  if (!dob || !isString(dob) || !isDate(dob)) {
    throw new Error(
      "Date of birth missing or incorrect format" + `${dob as string}`
    );
  }
  return dob;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(
      "Gender missing or incorrect format" + `${gender as string}`
    );
  }
  return gender;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("SSN missing or incorrect format" + `${ssn as string}`);
  }
  return ssn;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(
      "Date  missing or provided in wrong format" + `${date as string}`
    );
  }
  return date;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(
      "Description missing or incorrect format" + `${description as string}`
    );
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(
      "Specialist missing or incorrect format" + `${specialist as string}`
    );
  }
  return specialist;
};

const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseEntryType = (entryType: any): EntryType => {
  if (!entryType || !isEntryType(entryType)) {
    throw new Error(
      "Entry type missing or incorrect format" + `${entryType as string}`
    );
  }
  return entryType;
};

const isRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: any): HealthCheckRating => {
  if (!rating || !isRating(rating)) {
    throw new Error(
      "HealthCheckRating missing or incorrect value" + `${rating as string}`
    );
  }
  return rating;
};

const parseSickLeave = (leave: any): SickLeave | undefined => {
  if (leave) {
    if (
      !isString(leave.startDate) ||
      !isString(leave.endDate) ||
      !isDate(leave.startDate) ||
      !isDate(leave.endDate)
    ) {
      throw new Error(
        "Provided sick leave is missing a value or has the wrong format." +
          `${leave.startDate as string} ${leave.endDate as string}`
      );
    } else {
      return { startDate: leave.startDate, endDate: leave.endDate };
    }
  } else {
    return undefined;
  }
};

const parseDischarger = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error("Discharge mus be provided.");
  }
  if (
    !discharge.date ||
    !discharge.criteria ||
    !isString(discharge.date) ||
    !isDate(discharge.date) ||
    !isString(discharge.criteria)
  ) {
    throw new Error(
      "Discharge must have both a date and a criteria. Both must be valid." +
        `${discharge.date as string} ${discharge.criteria}`
    );
  }
  return { date: discharge.date, criteria: discharge.criteria };
};

export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    ssn: parseSsn(object.ssn),
    entries: [],
  };
  return newPatient;
};

export const toNewEntry = (object: any): Entry => {
  const baseEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    type: parseEntryType(object.type),
    diagnosisCodes: object.diagnosisCodes,
  };
  switch (object.type) {
    case "HealthCheck":
      const newHealthCheck: HealthCheckEntry = {
        ...baseEntry,
        id: generateId(),
        type: "HealthCheck",
        healthCheckRating: parseRating(object.healthCheckRating),
      };
      return newHealthCheck;
    case "OccupationalHealthcare":
      const newOccupationalEntry: OccupationalHealthcareEntry = {
        ...baseEntry,
        id: generateId(),
        type: "OccupationalHealthcare",
        employerName: parseEmployer(object.employer),
        sickLeave: parseSickLeave(object.sickLeave),
      };
      return newOccupationalEntry;
    case "Hospital":
      const newHospitalEntry: HospitalEntry = {
        ...baseEntry,
        id: generateId(),
        type: "Hospital",
        discharge: parseDischarger(object.discharge),
      };
      return newHospitalEntry;
    default:
      throw new Error("Please provide a valid entry type");
  }
};
