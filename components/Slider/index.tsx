import React, { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import s from './Slider.module.css';
import useIsMobile from '@/hooks/use-is-mobile';
import { SliderButtons } from '@/components';
import { SliderProps } from '@/types/model';

const Slider: FC<SliderProps> = ({ items }) => {
  const isMobile = useIsMobile();

  return (
    <motion.section 
      className={s.slider} 
      id="slider" 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1, transition: { duration: 0.7 } }}
    >
      <h2>Trabajos Realizados</h2>
      <h4>Calidad y seguridad en cada proyecto eléctrico</h4>
      <Swiper
        spaceBetween={isMobile ? 10 : 30}
        slidesPerView={isMobile ? 1 : 3}
        pagination={{ clickable: true }}
        loop
        className={s.swiper}
      >
        <SliderButtons />
        {items && items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={s.swiper__slide}>
              <div className={s.swiper__slide__item}>
                {item && isMobile ? (
                  <div className={s.imageContainer}>
                    <Image
                      src={item.imageMobile}
                      alt={item.imageMobile}
                      fill
                      objectFit="contain"
                      quality={80}
                    />
                  </div>
                ) : (
                  <div className={s.imageContainer}>
                    <Image
                      src={item.image}
                      alt={item.image}
                      fill
                      objectFit="contain"
                      quality={80}
                    />
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default Slider;