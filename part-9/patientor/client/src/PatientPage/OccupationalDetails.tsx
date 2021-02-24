import React from "react";
import { Icon, TableCell } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../types";

import Diagnosis from "./Diagnosis";
import Sickleave from "./Sickleave";

const OccupationalDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <>
      <TableCell>{entry.date}</TableCell>
      <TableCell>
        <Icon name="doctor" color="blue" />
        {entry.type}
      </TableCell>
      <TableCell>
        <strong>Employer: </strong> {entry.employer}
        <Sickleave period={entry.sickLeave} />
      </TableCell>
      <TableCell>{entry.description}</TableCell>
      <Diagnosis diagnosisList={entry.diagnosisCodes} />
      <TableCell>{entry.specialist}</TableCell>
    </>
  );
};

export default OccupationalDetails;
