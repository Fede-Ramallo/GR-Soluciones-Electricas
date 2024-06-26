import React from 'react';
import { motion } from 'framer-motion';
import { useSwiper } from 'swiper/react';
import s from './SliderButtons.module.css';
import { Arrow } from '@/components';

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className={s.buttons}>
      <motion.div className={s.prev}>
        <Arrow left onClick={() => swiper.slidePrev()} />
      </motion.div>
      <motion.div className={s.next}>
        <Arrow onClick={() => swiper.slideNext()} />
      </motion.div>
    </div>
  );
};

export default SliderButtons;
