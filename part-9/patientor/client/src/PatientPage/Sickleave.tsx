import React from "react";

const Sickleave: React.FC<{
  period: { startDate: string; endDate: string } | undefined;
}> = ({ period }) => {
  return (
    <>
      {period ? (
        <div>
          <strong>Sick leave:</strong>
          <p>Start: {period.startDate}</p>
          <p>End: {period.endDate}</p>
        </div>
      ) : (
        <>
          <strong>Sick leave:</strong>
          None
        </>
      )}
    </>
  );
};

export default Sickleave;
