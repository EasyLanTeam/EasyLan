import * as React from "react";
import FormLabel from "../base/FormLabel";
import Input from "../base/Input";
import Check from "../base/Check";
import cn from "classnames";
import { useFormikContext } from "formik";
import { TournamentFormValues } from "./TournamentFormValues";

import styles from "./CreateTournamentForm.style.scss";

const MAX_PRIZE_COUNT = 5;

const PrizesSection = () => {
  const { values, handleChange, setFieldValue } = useFormikContext<
    TournamentFormValues
  >();

  const handlePrizeCountChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    if (!value.match(/^\d{1}$/)) {
      if (!value) {
        setFieldValue("prizeCount", "");
      }
      return;
    }
    const prizeCount = +value;

    if (prizeCount > MAX_PRIZE_COUNT) {
      setFieldValue("prizeCount", MAX_PRIZE_COUNT);
    } else if (prizeCount < 1) {
      setFieldValue("prizeCount", 1);
    } else {
      setFieldValue("prizeCount", prizeCount);
    }
  };

  const handlePrizeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    if (value === "no") {
      setFieldValue("prizeCount", 0);
    } else if (value === "yes") {
      setFieldValue("prizeCount", 1);
    }

    handleChange(evt);
  };

  const handlePrizeCountBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (!value) setFieldValue("prizeCount", 1);
  };

  return (
    <div className={cn(styles.formSection, styles.formSectionPrizes)}>
      <div className={styles.formSectionTitle}>Призы:</div>
      <div className={cn(styles.formFieldset, styles.formFieldsetPrizeType)}>
        <div className={styles.formFieldsetLabel}>Наличие призов</div>
        <div className={styles.formGroup}>
          <Check
            type="radio"
            id="money"
            name="prize"
            value="yes"
            label="С призами"
            onChange={handlePrizeChange}
            checked={values.prize === "yes"}
          ></Check>
        </div>
        <div className={styles.formGroup}>
          <Check
            type="radio"
            id="noprize"
            name="prize"
            value="no"
            label="Без призов"
            onChange={handlePrizeChange}
            checked={values.prize === "no"}
          ></Check>
        </div>
      </div>
      <div className={cn(styles.formFieldset, styles.formFieldsetPrizeCount)}>
        <div className={cn(styles.formGroup, styles.formGroupPrizeCount)}>
          <FormLabel
            className={cn(styles.formLabel, styles.formLabelPrizeCount)}
            htmlFor="prizeCount"
          >
            Кол-во победителей
          </FormLabel>
          <Input
            id="prizeCount"
            className={cn(styles.input, styles.inputPrizeCount)}
            onChange={handlePrizeCountChange}
            onBlur={handlePrizeCountBlur}
            value={values.prizeCount}
            disabled={values.prize === "no"}
          ></Input>
          <span className={styles.inputError}>Ошибка</span>
        </div>
      </div>
      {Array.from(Array(values.prizeCount).keys()).map((prizeIndex) => (
        <div
          className={cn(styles.formGroup, styles.formGroupPrizes)}
          key={`prize-${prizeIndex}`}
        >
          <FormLabel
            className={cn(styles.formLabel, styles.formLabelPrizes)}
            htmlFor={`prize-${prizeIndex}`}
          >
            {`Приз за ${prizeIndex + 1}-е место`}
          </FormLabel>
          <Input
            id={`prizes[${prizeIndex}]`}
            name={`prizes[${prizeIndex}]`}
            value={values.prizes[prizeIndex] || ""}
            className={cn(styles.input, styles.inputPrizes)}
            onChange={handleChange}
          ></Input>
          <span className={styles.inputError}>Ошибка</span>
        </div>
      ))}
    </div>
  );
};

export default PrizesSection;
