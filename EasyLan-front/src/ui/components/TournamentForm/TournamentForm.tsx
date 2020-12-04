import * as React from "react";
import * as yup from "yup";
import dayjs from "dayjs";
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

interface ITournamentFormProps {
  onSubmit: (tournament: Tournament) => void;
  tournament?: Tournament;
}

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

const tournamentFormValuesMapper = ({
  date: dateStr,
  time: timeStr,
  game,
  gameFormat,
  type,
  prizes,
  maxParticipants,
  minParticipants,
  fee,
  city,
  street,
  house,
}: TournamentFormValues) => {
  const [hourStr, minuteStr] = timeStr.split(":");
  const datetime = dayjs(dateStr)
    .set("hour", +hourStr)
    .set("minute", +minuteStr)
    .toDate();
  const location = [city, street, house].join(", ");

  return {
    initiatorFullname: "username",
    datetime,
    location,
    type: type === "single" ? 0 : 1,
    game,
    gameFormat,
    prizes: prizes.map((prize, index) => ({
      place: index + 1,
      prize: prize,
    })),
    minParticipants: minParticipants,
    maxParticipants: maxParticipants,
    fee: fee,
  } as Tournament;
};

const TournamentForm: React.FunctionComponent<ITournamentFormProps> = (
  props: ITournamentFormProps
) => {
  const handleSubmit = (values: TournamentFormValues, actions: any) => {
    props.onSubmit(tournamentFormValuesMapper(values));
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

export default TournamentForm;
