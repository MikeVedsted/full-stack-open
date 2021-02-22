import React from "react";
import { Icon, TableCell } from "semantic-ui-react";

import { HealthCheckEntry } from "../types";
import Diagnosis from "./Diagnosis";
import HealthRating from "./HealthRating";

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  return (
    <>
      <TableCell>{entry.date}</TableCell>
      <TableCell>
        <Icon name="heartbeat" color="blue" />
        {entry.type}
      </TableCell>
      <HealthRating rating={entry.healthCheckRating} />
      <TableCell>{entry.description}</TableCell>
      <Diagnosis diagnosisList={entry.diagnosisCodes} />
      <TableCell>{entry.specialist}</TableCell>
    </>
  );
};

export default HealthCheckDetails;
