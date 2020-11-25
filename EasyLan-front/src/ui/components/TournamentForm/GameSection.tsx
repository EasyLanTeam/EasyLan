import * as React from "react";
import FormLabel from "../base/FormLabel";
import Input from "../base/Input";
import cn from "classnames";
import { ErrorMessage, useFormikContext, Field } from "formik";
import { TournamentFormValues } from "./TournamentFormValues";

import styles from "./TournamentForm.style.scss";

const GameSection = () => {
  const {
    values,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext<TournamentFormValues>();
  const handleInputBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    const { id, name, value } = evt.target;

    setFieldValue(name || id, value.trim());
    setFieldTouched(name || id);
  };

  return (
    <div className={cn(styles.formSection, styles.formSectionDiscipline)}>
      <div className={styles.formSectionTitle}>Дисциплина:</div>
      <div className={styles.formGroup}>
        <FormLabel className={styles.formLabel} htmlFor="game">
          Игра
        </FormLabel>
        <Input
          id="game"
          value={values.game}
          className={styles.input}
          onChange={handleChange}
          onBlur={handleInputBlur}
        ></Input>
        <span className={styles.inputError}>
          <ErrorMessage name="game" />
        </span>
      </div>
      <div className={styles.formGroup}>
        <FormLabel className={styles.formLabel} htmlFor="gameFormat">
          Формат
        </FormLabel>
        <Input
          id="gameFormat"
          value={values.gameFormat}
          className={styles.input}
          onChange={handleChange}
          onBlur={handleInputBlur}
        ></Input>
        <span className={styles.inputError}>
          <ErrorMessage name="gameFormat" />
        </span>
      </div>
    </div>
  );
};

export default GameSection;
