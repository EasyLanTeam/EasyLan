import * as React from "react";
import FormLabel from "../base/FormLabel";
import Input from "../base/Input";
import cn from "classnames";
import { useFormikContext } from "formik";
import { TournamentFormValues } from "./TournamentFormValues";

import styles from "./CreateTournamentForm.style.scss";

const DisciplineSection = () => {
  const { values, handleChange, setFieldValue } = useFormikContext<
    TournamentFormValues
  >();
  const handleInputBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    const { id, name, value } = evt.target;

    setFieldValue(name || id, value.trim());
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
        <span className={styles.inputError}>Ошибка</span>
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
        <span className={styles.inputError}>Ошибка</span>
      </div>
    </div>
  );
};

export default DisciplineSection;
