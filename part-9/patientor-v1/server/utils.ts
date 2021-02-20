import { NewPatient, Gender } from "./types";

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

const toNewPatient = (object: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    ssn: parseSsn(object.ssn),
  };
  return newEntry;
};

export default toNewPatient;
