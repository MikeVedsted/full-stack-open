import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import OccupationalEntryForm, {
  EntryFormValues,
} from "./OccupationalEntryForm";
import HospitalEntryForm, { HospitalFormProps } from "./HospitalEntryForm";
import HealthCheckEntryForm, {
  HealthCheckFormProps,
} from "./HealthCheckEntryForm";

interface EntryModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (
    values: EntryFormValues | HospitalFormProps | HealthCheckFormProps
  ) => void;
  error?: string;
}

const AddEntryModal: React.FC<EntryModalProps> = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <OccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      <HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
