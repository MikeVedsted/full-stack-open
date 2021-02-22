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
  Button,
} from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { setPatientInfo, useStateValue } from "../state";
import { Patient } from "../types";

import EntryDetails from "./EntryDetails";
import AddEntryModal from "../Modals/AddEntryModal";
import { EntryFormValues } from "../Modals/AddEntryModal/AddEntryForm";

const PatientPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  const submitNewEntry = async (values: EntryFormValues) => {
    // try {
    //   const { data: newPatient } = await axios.post<Patient>(
    //     `${apiBaseUrl}/patients`,
    //     values
    //   );
    //   dispatch(addPatient(newPatient));
    //   closeModal();
    // } catch (e) {
    //   console.error(e.response.data);
    //   setError(e.response.data.error);
    // }
    console.log(values);
  };

  const fetchFullPatient = async () => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      console.log("response ", patientFromApi);
      dispatch(setPatientInfo(patientFromApi));
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
    console.log(patient);
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
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <Table celled>
        <TableHeader>
          <TableRow>
            <Table.HeaderCell>Entries</Table.HeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patient.entries?.map((entry) => (
            <TableRow key={entry.id}>
              <EntryDetails entry={entry} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default PatientPage;
