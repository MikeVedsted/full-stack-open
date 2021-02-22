import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Icon,
  Header,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
} from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  const fetchFullPatient = async () => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch({ type: "SET_PATIENT_INFO", payload: patientFromApi });
    } catch (e) {
      console.error(e);
    }
  };

  const gender = () => {
    switch (patient.gender) {
      case "male":
        return <Icon name="mars" />;
      case "female":
        return <Icon name="venus" />;
      default:
        return <Icon name="other gender vertical" />;
    }
  };

  useEffect(() => {
    !patient.ssn && fetchFullPatient();
  }, [id]);

  return (
    <div className="App">
      <Header as="h3">
        {patient.name} {gender()}
      </Header>
      <Table celled>
        <TableHeader>
          <TableRow>
            <Table.HeaderCell colSpan="2">Patient information</Table.HeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>SSN</TableCell>
            <TableCell>{patient.ssn}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Date of birth</TableCell>
            <TableCell>{patient.dateOfBirth}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Occupation</TableCell>
            <TableCell>{patient.occupation}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow>
            <Table.HeaderCell colSpan="2">Entries</Table.HeaderCell>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};

export default PatientPage;
