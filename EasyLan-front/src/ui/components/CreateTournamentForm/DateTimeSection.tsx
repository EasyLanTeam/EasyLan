import * as React from "react";
import FormLabel from "../base/FormLabel";
import Input from "../base/Input";
import cn from "classnames";
import { useFormikContext } from "formik";
import { TournamentFormValues } from "./TournamentFormValues";

import styles from "./CreateTournamentForm.style.scss";

const DateTimeSection = () => {
  const { values, handleChange } = useFormikContext<TournamentFormValues>();

  return (
    <div className={cn(styles.formSection, styles.formSectionDateTime)}>
      <div className={styles.formSectionTitle}>Время проведения:</div>
      <div className={styles.formGroup}>
        <FormLabel className={styles.formLabel} htmlFor="date">
          Дата
        </FormLabel>
        <Input
          id="date"
          name="date"
          type="date"
          className={styles.input}
          value={values.date}
          onChange={handleChange}
        ></Input>
        <span className={styles.inputError}>Ошибка</span>
      </div>
      <div className={styles.formGroup}>
        <FormLabel className={styles.formLabel} htmlFor="time">
          Время
        </FormLabel>
        <Input
          id="time"
          type="time"
          className={styles.input}
          value={values.time}
          onChange={handleChange}
        ></Input>
        <span className={styles.inputError}>Ошибка</span>
      </div>
    </div>
  );
};

export default DateTimeSection;
