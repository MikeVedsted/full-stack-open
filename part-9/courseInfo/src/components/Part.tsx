import React from "react";
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <p>Name: {part.name} </p>
          <p>exercise count: {part.exerciseCount} </p>
          <p>description: {part.description}</p>
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <p>Name: {part.name} </p>
          <p>exercise count: {part.exerciseCount}</p>
          <p>groupProjectCount: {part.groupProjectCount}</p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <p>Name: {part.name}</p>
          <p>exercise count: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>exerciseSubmissionLink: {part.exerciseSubmissionLink}</p>
        </div>
      );
    case "Typescript is great":
      return (
        <div>
          <p>Name: {part.name}</p>
          <p>exercise count: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>instructor {part.instructor}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
