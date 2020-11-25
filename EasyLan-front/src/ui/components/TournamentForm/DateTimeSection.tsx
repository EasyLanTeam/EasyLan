import * as React from "react";
import FormLabel from "../base/FormLabel";
import Input from "../base/Input";
import cn from "classnames";
import { ErrorMessage, useFormikContext } from "formik";
import { TournamentFormValues } from "./TournamentFormValues";

import styles from "./TournamentForm.style.scss";

const DateTimeSection = () => {
  const { values, handleChange, setFieldTouched } = useFormikContext<
    TournamentFormValues
  >();

  const handleInputBlur = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    const { id, name } = target;
    setFieldTouched(id || name);
  };

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
          onBlur={handleInputBlur}
        ></Input>
        <span className={styles.inputError}>
          <ErrorMessage name="date" />
        </span>
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
          onBlur={handleInputBlur}
        ></Input>
        <span className={styles.inputError}>
          <ErrorMessage name="time" />
        </span>
      </div>
    </div>
  );
};

export default DateTimeSection;
