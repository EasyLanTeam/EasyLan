import * as React from "react";
import * as yup from "yup";
import { Formik, FormikProps } from "formik";
import Button from "../base/Button";
import { TournamentFormValues } from "./TournamentFormValues";
import { Tournament } from "../../../data/entities/Tournament";
import PrizesSection from "./PrizesSection";
import ParticipantsSection from "./ParticipantsSection";
import LocationSection from "./LocationSection";
import DateTimeSection from "./DateTimeSection";
import TournamentTypeSection from "./TornamentTypeSection";
import GameSection from "./GameSection";
import AdditionalInfoSection from "./AdditionalInfoSection";

import styles from "./TournamentForm.style.scss";
import { tournamentFormValuesMapper } from "./tournamentFormValuesMapper";

interface ITournamentFormProps {
  onSubmit: (tournament: Tournament) => void;
  tournamentFormValues?: TournamentFormValues;
  type?: "create" | "update";
}

const renderForm = (
  props: FormikProps<TournamentFormValues>,
  type: "create" | "update"
) => {
  const { handleSubmit } = props;

  return (
    <div className={styles.form}>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>
          {type === "update" ? "Изменение данных турнира" : "Создание турнира"}
        </h3>
      </div>
      <div className={styles.formBody}>
        <DateTimeSection />
        <LocationSection />
        <TournamentTypeSection />
        <GameSection />
        <PrizesSection />
        <ParticipantsSection />
        <AdditionalInfoSection />
        <Button
          type="submit"
          variant="primary"
          className={styles.submitButton}
          onClick={() => handleSubmit()}
        >
          {type === "update" ? "Принять изменения" : "Создать турнир"}
        </Button>
      </div>
    </div>
  );
};

const formDefaultValues: TournamentFormValues = {
  initiatorId: null,
  initiatorFullname: null,
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
  minParticipants: 4,
  maxParticipants: 16,
  fee: 0,
  additionalInfo: "",
};

const errorMessages = {
  required: "Обязательное поле",
  maxSymbols: "Слишком длинное значение поля",
  datePassed: "Введите корректную дату",
};

const validationSchema = yup.object().shape({
  date: yup
    .date()
    .transform(function (value: any, originalValue: any) {
      if (this.isType(value)) return value;

      const [yearStr, monthStr, dateStr] = originalValue.split("-");
      value = new Date(+yearStr, +monthStr, +dateStr);

      return value;
    })
    .min(new Date().toISOString().split("T")[0], errorMessages.datePassed),
  city: yup
    .string()
    .required(errorMessages.required)
    .max(250, errorMessages.maxSymbols),
  street: yup
    .string()
    .required(errorMessages.required)
    .max(250, errorMessages.maxSymbols),
  house: yup
    .string()
    .required(errorMessages.required)
    .max(250, errorMessages.maxSymbols),
  game: yup
    .string()
    .required(errorMessages.required)
    .max(250, errorMessages.maxSymbols),
  gameFormat: yup.string().max(250, errorMessages.maxSymbols),
  prizeCount: yup.number().required(),
  minParticipants: yup.number().required(),
  maxParticipants: yup.number().required(),
  fee: yup.number().required(),
  prizes: yup
    .array()
    .of(
      yup
        .string()
        .required(errorMessages.required)
        .max(250, errorMessages.maxSymbols)
    ),
  additionalInfo: yup.string().max(250, errorMessages.maxSymbols),
});

const TournamentForm: React.FunctionComponent<ITournamentFormProps> = ({
  type,
  onSubmit,
  tournamentFormValues,
}: ITournamentFormProps) => {
  const handleSubmit = (values: TournamentFormValues, actions: any) => {
    onSubmit(tournamentFormValuesMapper(values));
  };

  return (
    <Formik
      initialValues={tournamentFormValues || formDefaultValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnBlur={true}
    >
      {(props) => renderForm(props, type)}
    </Formik>
  );
};

TournamentForm.defaultProps = {
  type: "create",
};

export default TournamentForm;
