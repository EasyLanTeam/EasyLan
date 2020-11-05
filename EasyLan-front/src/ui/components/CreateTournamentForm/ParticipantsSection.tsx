import * as React from "react";
import FormLabel from "../base/FormLabel";
import Input from "../base/Input";
import cn from "classnames";
import { useFormikContext } from "formik";
import { TournamentFormValues } from "./TournamentFormValues";

import styles from "./CreateTournamentForm.style.scss";

const DEFAULT_MIN_PARTICIPANTS = 2;

const ParticipantsSection = () => {
  const { values, setFieldValue } = useFormikContext<TournamentFormValues>();

  const handleParticipantsChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value: valueStr, id, name } = evt.target;
    if (valueStr && !valueStr.match(/^\d{0,4}$/)) {
      return;
    }

    const value = valueStr ? +valueStr : "";
    setFieldValue(name || id, value);
  };

  const handleFeeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: valueStr } = evt.target;
    if (valueStr && !valueStr.match(/^\d{0,15}$/)) {
      return;
    }

    const value = valueStr ? +valueStr : "";
    setFieldValue("fee", value);
  };

  const handleMinParticipantsBlur = (
    evt: React.FocusEvent<HTMLInputElement>
  ) => {
    const { value: valueStr } = evt.target;
    let value = DEFAULT_MIN_PARTICIPANTS;
    if (valueStr) {
      value = +valueStr;
    }

    if (value > values.maxParticipants) {
      value = values.maxParticipants;
    }

    setFieldValue("minParticipants", value);
  };

  const handleMaxParticipantsBlur = (
    evt: React.FocusEvent<HTMLInputElement>
  ) => {
    const { value: valueStr } = evt.target;
    let value = DEFAULT_MIN_PARTICIPANTS;
    if (valueStr) {
      value = +valueStr;
    }

    if (value < values.minParticipants) {
      value = values.minParticipants;
    }

    setFieldValue("maxParticipants", value);
  };

  const handleFeeBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (!values.fee) setFieldValue("fee", 0);
  };

  return (
    <div className={styles.formSection}>
      <div className={styles.formSectionTitle}>Требования к участникам:</div>
      <div className={cn(styles.formFieldset, styles.formFieldsetParticipants)}>
        <div
          className={cn(
            styles.formFieldsetLabel,
            styles.formFieldsetLabelParticipants
          )}
        >
          Кол-во участников/команд
        </div>
        <div className={cn(styles.formGroup, styles.formGroupParticipants)}>
          <FormLabel
            className={cn(styles.formLabel, styles.formLabelParticipants)}
            htmlFor="minParticipants"
          >
            От
          </FormLabel>
          <Input
            id="minParticipants"
            className={cn(styles.input, styles.inputParticipants)}
            value={values.minParticipants}
            onChange={handleParticipantsChange}
            onBlur={handleMinParticipantsBlur}
          ></Input>
          <span className={styles.inputError}>Ошибка</span>
        </div>
        <div className={cn(styles.formGroup, styles.formGroupParticipants)}>
          <FormLabel
            className={cn(styles.formLabel, styles.formLabelParticipants)}
            htmlFor="maxParticipants"
          >
            до
          </FormLabel>
          <Input
            id="maxParticipants"
            className={cn(styles.input, styles.inputParticipants)}
            onChange={handleParticipantsChange}
            value={values.maxParticipants}
            onBlur={handleMaxParticipantsBlur}
          ></Input>
          <span className={styles.inputError}>Ошибка</span>
        </div>
      </div>
      <div className={cn(styles.formGroup, styles.formGroupFee)}>
        <FormLabel
          className={cn(styles.formLabel, styles.formLabelFee)}
          htmlFor="fee"
        >
          Взнос
        </FormLabel>
        <div className={styles.inputWrapperFee}>
          <Input
            id="fee"
            value={values.fee}
            className={cn(styles.input, styles.inputFee)}
            onChange={handleFeeChange}
            onBlur={handleFeeBlur}
          ></Input>
          <span className={styles.inputFeeMoneySign}>РУБ</span>
        </div>
        <span className={styles.inputError}>Ошибка</span>
      </div>
    </div>
  );
};

export default ParticipantsSection;
