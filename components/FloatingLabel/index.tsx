import React, { FC } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import _ from 'lodash';
import cs from 'classnames';
import styles from './FloatingLabel.module.css';

type ErrorLabelProps = {
  message?: string;
};

const ErrorLabel: FC<ErrorLabelProps> = ({ message }) => {
  const ErrorVariants: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    hide: {
      opacity: 0,
      y: '-100%',
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      y: '-100%',
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.span
      className={styles.error_message}
      variants={ErrorVariants}
      initial="hide"
      animate="visible"
      exit="exit">
      {message}
    </motion.span>
  );
};

interface FloatingLabelProps {
  inputName: string;
  placeholder?: string;
  type?: string;
  hasError?: boolean;
  errorMessage?: string;
  handleChange?: (e: React.ChangeEvent<any>) => void; // eslint-disable-line no-unused-vars
  handleBlur?: (e: React.FocusEvent<any>) => void; // eslint-disable-line no-unused-vars
  value?: string | number | readonly string[];
  dataType?: 'name' | 'lastname' | 'data' | 'phone';
}

const FloatingLabel: FC<FloatingLabelProps> = ({
  inputName,
  placeholder,
  type,
  hasError,
  errorMessage,
  handleChange,
  handleBlur,
  value,
  dataType
}) => {
  const hasValue = () => {
    return _.size(value?.toString()) > 0;
  };
  const classNames = cs(styles.floating_label, {
    [styles.input_name]: _.isEqual(dataType, 'name'),
    [styles.input_lastname]: _.isEqual(dataType, 'lastname'),
    [styles.input_data]: _.isEqual(dataType, 'data'),
    [styles.input_phone]: _.isEqual(dataType, 'phone')
  });

  const labelClassNames = cs(styles.label, {
    [styles.label__active]: hasValue()
  });

  return (
    <motion.div className={classNames}>
      <input
        autoComplete="off"
        name={inputName}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
      />
      <label className={labelClassNames} htmlFor={inputName}>
        {placeholder}
      </label>

      <AnimatePresence initial={false}>
        {hasError && errorMessage && <ErrorLabel message={errorMessage} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default FloatingLabel;
