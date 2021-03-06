import * as React from "react";
import FormLabel from "../base/FormLabel";
import Input from "../base/Input";
import cn from "classnames";
import { ErrorMessage, useFormikContext } from "formik";
import { TournamentFormValues } from "./TournamentFormValues";

import styles from "./TournamentForm.style.scss";

const LocationSection = (): JSX.Element => {
  const {
    values,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext<TournamentFormValues>();
  const handleInputBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    const { id, name, value } = evt.target;

    setFieldValue(name || id, value.trim(), true);
    setFieldTouched(name || id);
  };

  return (
    <div className={cn(styles.formSection, styles.formSectionLocation)}>
      <div className={styles.formSectionTitle}>Место проведения:</div>
      <div className={styles.formGroup}>
        <FormLabel
          className={cn(styles.formLabel, styles.formLabelLocation)}
          htmlFor="city"
        >
          Город
        </FormLabel>
        <Input
          id="city"
          className={cn(styles.input, styles.inputLocation)}
          onChange={handleChange}
          value={values.city}
          onBlur={handleInputBlur}
        ></Input>
        <span className={styles.inputError}>
          <ErrorMessage name="city" />
        </span>
      </div>
      <div className={styles.formGroup}>
        <FormLabel
          className={cn(styles.formLabel, styles.formLabelLocation)}
          htmlFor="street"
        >
          Улица
        </FormLabel>
        <Input
          id="street"
          className={cn(styles.input, styles.inputLocation)}
          value={values.street}
          onChange={handleChange}
          onBlur={handleInputBlur}
        ></Input>
        <span className={styles.inputError}>
          <ErrorMessage name="street" />
        </span>
      </div>
      <div className={styles.formGroup}>
        <FormLabel
          className={cn(styles.formLabel, styles.formLabelLocation)}
          htmlFor="house"
        >
          Дом
        </FormLabel>
        <Input
          id="house"
          className={cn(styles.input, styles.inputLocation)}
          value={values.house}
          onChange={handleChange}
          onBlur={handleInputBlur}
        ></Input>
        <span className={styles.inputError}>
          <ErrorMessage name="house" />
        </span>
      </div>
    </div>
  );
};

export default LocationSection;
