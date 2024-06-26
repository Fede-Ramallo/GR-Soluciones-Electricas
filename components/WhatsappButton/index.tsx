import React, { FC } from 'react';
import { motion, Variants } from 'framer-motion';
import style from './WhatsappFloat.module.css';
import { logEvent } from '@/lib/helpers';

const WhatsAppButton: FC = () => {
  const handleClick = () => {
    const link = 'https://wa.me/5493513967959';
    window.open(link, '_blank');
    
    logEvent({
      eventName: '02_USER_PRESS_WHATSAPP_BUTTON'
    });
  };

  const ButtonVariants: Variants = {
    initial: {
      opacity: 0,
      x: 100
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.5,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0
    }
  };

  return (
    <motion.button
      variants={ButtonVariants}
      className={style.whatsapp_button}
      onClick={handleClick}
      initial="initial"
      animate="visible"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}>
      <svg xmlSpace="preserve" viewBox="0 0 75.7 75.7">
        <circle cx="37.8" cy="37.8" r="37.2" fill="#25D366" />
        <path
          fill="#fff"
          d="M37.8 18.6c-10.6 0-19.2 8.6-19.2 19.2 0 4.2 1.4 8.1 3.7 11.2l-2.4 7.1 7.4-2.4c3 2 6.7 3.2 10.6 3.2C48.4 57 57 48.4 57 37.8s-8.6-19.2-19.2-19.2zM49 45.7c-.5 1.3-2.3 2.4-3.8 2.7-1 .2-2.3.4-6.7-1.4-5.6-2.3-9.3-8.1-9.6-8.4-.3-.4-2.3-3-2.3-5.8s1.4-4.1 2-4.7c.5-.5 1.2-.7 2-.7h.6c.6 0 .8.1 1.2.9.5 1.1 1.6 3.9 1.7 4.2.1.3.3.7.1 1-.2.4-.3.6-.6.9-.3.3-.6.6-.8.9-.3.3-.6.6-.2 1.2.3.6 1.5 2.4 3.1 3.9 2.1 1.9 3.9 2.5 4.5 2.8.5.2 1 .1 1.4-.2.4-.5 1-1.2 1.5-2 .4-.5.9-.6 1.4-.4.5.2 3.3 1.5 3.8 1.8.6.3.9.4 1.1.7.1.2.1 1.3-.4 2.6z"
        />
      </svg>
    </motion.button>
  );
};

export default WhatsAppButton;
