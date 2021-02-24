import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddEntryForm, { AddEntryFormValues } from "./AddEntryForm";

interface EntryModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AddEntryFormValues) => void;
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
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
