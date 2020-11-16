import * as React from "react";
import * as yup from "yup";
import { Formik, FormikProps } from "formik";
import Button from "../../components/base/Button";
import { TournamentFormValues } from "./TournamentFormValues";
import PrizesSection from "./PrizesSection";
import ParticipantsSection from "./ParticipantsSection";
import LocationSection from "./LocationSection";
import DateTimeSection from "./DateTimeSection";
import TournamentTypeSection from "./TornamentTypeSection";
import GameSection from "./GameSection";
import AdditionalInfoSection from "./AdditionalInfoSection";

import styles from "./CreateTournamentForm.style.scss";
import { Tournament } from "../../../data/Tournament";
import dayjs from "dayjs";

interface ICreateTournamentFormProps {}

const renderForm = (props: FormikProps<TournamentFormValues>) => {
  const { handleSubmit } = props;

  return (
    <div className={styles.form}>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>Создание турнира</h3>
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
          Создать турнир
        </Button>
      </div>
    </div>
  );
};

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

const CreateTournamentForm: React.FunctionComponent<ICreateTournamentFormProps> = (
  props
) => {
  const handleSubmit = (values: TournamentFormValues, actions: any) => {
    const { date: dateStr, time: timeStr } = values;
    const [hourStr, minuteStr] = timeStr.split(":");
    const datetime = dayjs(dateStr)
      .set("hour", +hourStr)
      .set("minute", +minuteStr)
      .toDate();
    const location = [values.city, values.street, values.house].join(", ");
    const tournamentEntity: Tournament = {
      id: null,
      organizerId: "o1",
      organizerFullname: "username",
      datetime,
      location,
      type: values.type,
      game: values.game,
      gameFormat: values.gameFormat,
      prizes: values.prizes,
      minParticipants: values.minParticipants,
      maxParticipants: values.maxParticipants,
      fee: values.fee,
    };

    console.log(tournamentEntity);
  };

  return (
    <Formik
      initialValues={formDefaultValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnBlur={true}
    >
      {(props) => renderForm(props)}
    </Formik>
  );
};

export default CreateTournamentForm;
