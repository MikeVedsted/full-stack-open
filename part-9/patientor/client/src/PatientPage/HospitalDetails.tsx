import React from "react";
import { HospitalEntry } from "../types";
import { Icon, TableCell } from "semantic-ui-react";

import Diagnosis from "./Diagnosis";

const HospitalDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <>
      <TableCell>{entry.date}</TableCell>
      <TableCell>
        <Icon name="hospital symbol" color="blue" />
        {entry.type}
      </TableCell>
      <TableCell>{entry.description}</TableCell>
      <Diagnosis diagnosisList={entry.diagnosisCodes} />
      <TableCell>
        <strong>Discharge:</strong>
        <br />
        {entry.discharge.date}
        <br />
        <strong>Criteria: </strong>
        <br />
        {entry.discharge.criteria}
      </TableCell>
      <TableCell>{entry.specialist}</TableCell>
    </>
  );
};

export default HospitalDetails;
