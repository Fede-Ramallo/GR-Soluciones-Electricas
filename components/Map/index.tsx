import s from './Map.module.css';
import { FC } from 'react';
import { MapProps } from '@/types/model';
import { motion } from 'framer-motion';

const Map: FC<MapProps> = ({ ubication, title, subtitle }) => {
  const newUbication = ubication?.replace(/ /g, '+');

  // FONT-SIZE EN GLOBALS.CSS, UBICACION CUSTOMIZABLE DESDE DATASET

  return (
    <motion.section className={s.map} initial={{opacity: 0}} whileInView={{ opacity: 1, transition: { duration: 0.5}}} id='map'>
      <h2 className={s.map__title}>{title}</h2>
      <h3 className={s.map__subtitle}>{subtitle}</h3>
      <iframe
        className={s.map__map}
        loading="lazy"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA_9a3_PJwxKYY23NZgia3ItBqSRx8VJOU
        &q=${newUbication}`}></iframe>
    </motion.section>
  );
};

export default Map;
