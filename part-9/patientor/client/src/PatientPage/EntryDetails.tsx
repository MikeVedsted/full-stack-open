import React from "react";

import { Entry } from "../types";
import { assertNever } from "../util";
import HospitalDetails from "./HospitalDetails";
import HealthCheckDetails from "./HealthCheckDetails";
import OccupationalDetails from "./OccupationalDetails";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} />;
    case "Hospital":
      return <HospitalDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
