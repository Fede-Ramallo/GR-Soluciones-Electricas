import React, { FC } from 'react';
import { motion } from 'framer-motion';
import cs from 'classnames';

import s from './Arrow.module.css';
import { ArrowProps } from '@/types/model';

const Arrow: FC<ArrowProps> = ({ disabled, left, onClick, alternative }) => {
  const className = cs(s.arrow__button, {
    [s.arrow__button__alternative]: alternative,
    [s.arrow__button__disabled]: disabled
  });

  return (
    <motion.button
      className={className}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Arrow ${left ? 'Left' : 'Right'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 16.104 24.972">
        {!left && (
          <path d="m4.202 1.511 9.9 9.9c.167.167.283.333.35.5.067.167.1.35.1.55 0 .2-.033.383-.1.55a1.524 1.524 0 0 1-.35.5l-9.95 9.95c-.3.3-.658.45-1.075.45-.417 0-.775-.15-1.075-.45s-.442-.667-.425-1.1c.017-.433.175-.8.475-1.1l8.8-8.8-8.85-8.85c-.3-.3-.45-.65-.45-1.05s.15-.75.45-1.05.667-.45 1.1-.45.8.15 1.1.45z" />
        )}
        {left && (
          <path d="m11.902 23.461-9.9-9.9a1.524 1.524 0 0 1-.35-.5c-.067-.167-.1-.35-.1-.55 0-.2.033-.383.1-.55.067-.167.183-.333.35-.5l9.95-9.95c.3-.3.658-.45 1.075-.45.417 0 .775.15 1.075.45.3.3.442.667.425 1.1a1.59 1.59 0 0 1-.475 1.1l-8.8 8.8 8.85 8.85c.3.3.45.65.45 1.05s-.15.75-.45 1.05-.667.45-1.1.45-.8-.15-1.1-.45z" />
        )}
      </svg>
    </motion.button>
  );
};

export default Arrow;
