import * as React from "react";
import Check from "../base/Check";
import cn from "classnames";
import { useFormikContext } from "formik";
import { TournamentFormValues } from "./TournamentFormValues";

import styles from "./TournamentForm.style.scss";

const TournamentTypeSection = () => {
  const { values, handleChange } = useFormikContext<TournamentFormValues>();

  return (
    <div className={cn(styles.formSection, styles.formSectionTournamentType)}>
      <div className={styles.formSectionTitle}>Тип турнира:</div>
      <div className={styles.formGroup}>
        <Check
          type="radio"
          id="team"
          name="type"
          value="team"
          label="Командный"
          onChange={handleChange}
          checked={values.type === "team"}
        ></Check>
      </div>
      <div className={styles.formGroup}>
        <Check
          type="radio"
          id="single"
          name="type"
          value="single"
          label="Индивидуальный"
          onChange={handleChange}
          checked={values.type === "single"}
        ></Check>
      </div>
    </div>
  );
};

export default TournamentTypeSection;
