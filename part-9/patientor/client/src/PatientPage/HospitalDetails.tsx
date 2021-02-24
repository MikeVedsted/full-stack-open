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
      
      <TableCell>
        <strong>Discharge:</strong>
        {entry.discharge.date}
        <strong>Criteria: </strong>
        {entry.discharge.criteria}
      </TableCell>
      <TableCell>{entry.description}</TableCell>
      <Diagnosis diagnosisList={entry.diagnosisCodes} />
      <TableCell>{entry.specialist}</TableCell>
    </>
  );
};

export default HospitalDetails;
