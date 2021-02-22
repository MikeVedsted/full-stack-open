import React from "react";
import { Icon, TableCell } from "semantic-ui-react";

const HealthRating: React.FC<{ rating: number }> = ({ rating }) => {
  switch (rating) {
    case 0:
      return (
        <TableCell>
          <Icon name="heart" color="green" />
        </TableCell>
      );
    case 1:
      return (
        <TableCell>
          <Icon name="heart" color="yellow" />
        </TableCell>
      );
    case 2:
      return (
        <TableCell>
          <Icon name="heart" color="orange" />
        </TableCell>
      );
    case 3:
      return (
        <TableCell>
          <Icon name="heart" color="red" />
        </TableCell>
      );
    default:
      return <TableCell>Invalid or missing rating: {rating}</TableCell>;
  }
};

export default HealthRating;
