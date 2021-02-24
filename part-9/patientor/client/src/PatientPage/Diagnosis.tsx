import React from "react";
import { TableCell } from "semantic-ui-react";

import { useStateValue } from "../state";

const Diagnosis: React.FC<{ diagnosisList: string[] | undefined }> = ({
  diagnosisList,
}) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <TableCell>
      {diagnosisList ? (
        <ul>
          {diagnosisList.map((diagnose) => (
            <li key={diagnose}>
              {diagnose} {diagnosis[diagnose].name}
            </li>
          ))}
        </ul>
      ) : (
        "No diagnosis made"
      )}
    </TableCell>
  );
};

export default Diagnosis;
