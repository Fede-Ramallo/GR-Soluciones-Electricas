import React, { FC } from 'react';
import _ from 'lodash';
import styles from './Select.module.css';

interface SelectOption {
  value: string;
  label: string;
}
interface SelectProps {
  handleChange: (e: any) => void; // eslint-disable-line no-unused-vars
  options?: SelectOption[];
  inputName: string;
  value?: string;
}

const Select: FC<SelectProps> = ({ handleChange, options, value, inputName }) => {
  return (
    <div className={styles.input_options}>
      <select value={value} name={inputName} onChange={handleChange}>
        {options &&
          options.map((option) => {
            if (_.isEqual(option.value, 'default')) {
              return (
                <option
                  key={option.value}
                  value={option.value}
                  className={styles.hidden_option}
                  disabled>
                  {option.label}
                </option>
              );
            } else {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            }
          })}
      </select>
    </div>
  );
};

export default Select;
