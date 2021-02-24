import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {
  EntryOption,
  SelectField,
  TextField,
  DiagnosisSelection,
  NumberField,
} from "../FormField";
import { Entry, EntryType } from "../../types";
import { useStateValue } from "../../state";

export type AddEntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: AddEntryFormValues) => void;
  onCancel: () => void;
}

const entryOptions: EntryOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" },
];

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();

  const additionalFields = (type: EntryType) => {
    switch (type) {
      case "HealthCheck":
        return (
          <Field
            label="Health rating"
            name="healthCheckRating"
            component={NumberField}
          />
        );
      case "Hospital":
        return (
          <>
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Criteria for discharge"
              name="discharge.criteria"
              component={TextField}
            />
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <Field
              label="Employer"
              placeholder="Employer's name"
              name="employer"
              component={TextField}
            />
            <Field
              label="Sick leave start"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave end"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
          </>
        );
      default:
        break;
    }
  };

  const validate = (values: any) => {
    const errors: { [field: string]: string } = {};
    const requiredError = "Field is required";
    const formatError = "Field is in wrong format";
    const invalidValue = "Value is invalid";
    if (!values.date) {
      errors.date = requiredError;
    }
    if (!/^[0-9]{4}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}?$/.test(values.date)) {
      errors.date = formatError;
    }
    if (!values.description) {
      errors.description = requiredError;
    }
    if (!values.specialist) {
      errors.specialist = requiredError;
    }
    if (values.type === EntryType.HealthCheck) {
      if (!values.healthCheckRating) {
        errors.healthCheckRating = requiredError;
      }
      if (values.healthCheckRating > 3 || values.healthCheckRating < 0) {
        errors.healthCheckRating = invalidValue;
      }
    }
    if (values.type === EntryType.Hospital) {
      if (!values.discharge.criteria || !values.discharge.date) {
        errors.discharge = requiredError;
      }
    }
    if (values.type === EntryType.OccupationalHealthcare) {
      if (!values.employer) {
        errors.employer = requiredError;
      }
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: EntryType.HealthCheck,
        healthCheckRating: 0,
        employer: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        discharge: {
          date: "",
          criteria: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => validate(values)}
      enableReinitialize
    >
      {({ values, dirty, isValid, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry type"
              name="type"
              options={entryOptions}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            {additionalFields(values.type)}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
