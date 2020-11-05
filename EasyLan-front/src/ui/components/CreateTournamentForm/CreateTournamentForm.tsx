import * as React from "react";
import TextArea from "../../components/base/TextArea/TextArea";
import Button from "../../components/base/Button";
import { Formik, FormikProps } from "formik";
import { TournamentFormValues } from "./TournamentFormValues";
import PrizesSection from "./PrizesSection";
import ParticipantsSection from "./ParticipantsSection";
import LocationSection from "./LocationSection";
import DateTimeSection from "./DateTimeSection";
import TournamentTypeSection from "./TornamentTypeSection";
import DisciplineSection from "./DisciplineSection";

import styles from "./CreateTournamentForm.style.scss";

const renderForm = (props: FormikProps<TournamentFormValues>) => {
  const { values, handleChange, handleSubmit } = props;

  return (
    <div className={styles.form}>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>Создание турнира</h3>
      </div>
      <div className={styles.formBody}>
        <DateTimeSection />
        <LocationSection />
        <TournamentTypeSection />
        <DisciplineSection />
        <PrizesSection />
        <ParticipantsSection />
        <div className={styles.formSection}>
          <div className={styles.formSectionTitle}>Доп. информация:</div>
          <TextArea
            id="additionalInfo"
            onChange={handleChange}
            value={values.additionalInfo}
          ></TextArea>
          <span className={styles.inputError}>Ошибка</span>
        </div>
        <Button
          type="submit"
          variant="primary"
          className={styles.submitButton}
          onClick={() => handleSubmit()}
        >
          Создать турнир
        </Button>
      </div>
    </div>
  );
};

interface ICreateTournamentFormProps {}

const formDefaultValues: TournamentFormValues = {
  date: new Date().toISOString().split("T")[0],
  time: "17:00",
  city: "",
  street: "",
  house: "",
  type: "team",
  game: "",
  gameFormat: "",
  prize: "yes",
  prizeCount: 1,
  prizes: [""],
  minParticipants: 8,
  maxParticipants: 16,
  fee: 0,
  additionalInfo: "",
};

const CreateTournamentForm: React.FunctionComponent<ICreateTournamentFormProps> = (
  props
) => {
  const handleSubmit = (values: TournamentFormValues, actions: any) => {
    console.log("submit", values, actions);
  };

  const formInitialValues = formDefaultValues;

  return (
    <Formik initialValues={formInitialValues} onSubmit={handleSubmit}>
      {(props) => renderForm(props)}
    </Formik>
  );
};

export default CreateTournamentForm;
