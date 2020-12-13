import * as React from "react";
import { ErrorMessage, useFormikContext } from "formik";
import TextArea from "../base/TextArea/TextArea";
import { TournamentFormValues } from "./TournamentFormValues";

import styles from "./TournamentForm.style.scss";

interface IAdditionalInfoSectionProps {}

const AdditionalInfoSection: React.FunctionComponent<IAdditionalInfoSectionProps> = (): JSX.Element => {
  const {
    values,
    handleChange,
    setFieldTouched,
  } = useFormikContext<TournamentFormValues>();

  const handleAdditionalInfoBlur = ({
    target,
  }: React.FocusEvent<HTMLTextAreaElement>) => {
    const { id, name } = target;
    setFieldTouched(id || name);
  };

  return (
    <div className={styles.formSection}>
      <div className={styles.formSectionTitle}>Доп. информация:</div>
      <TextArea
        id="additionalInfo"
        onChange={handleChange}
        value={values.additionalInfo}
        onBlur={handleAdditionalInfoBlur}
      ></TextArea>
      <span className={styles.inputError}>
        <ErrorMessage name="additionalInfo" />
      </span>
    </div>
  );
};

export default AdditionalInfoSection;
