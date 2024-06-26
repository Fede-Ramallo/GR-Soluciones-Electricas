import React, { FC } from 'react';
import { motion } from 'framer-motion';
import cs from 'classnames';

import s from './Button.module.css';
import { ButtonProps } from '@/types/model';

const Button: FC<ButtonProps> = ({ label, onClick, disabled, secondary, type = 'button' }) => {
  const classNames = cs(s.button, {
    [s.secondary]: secondary
  });

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      type={type}>
      <span>{label}</span>
    </motion.button>
  );
};

export default Button;
