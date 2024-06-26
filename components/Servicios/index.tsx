import s from './Servicios.module.css';
import { ServiciosProps } from '@/types/model';
import { usePathname } from 'next/navigation';
import { ReactSVG } from 'react-svg';
import cs from 'classnames';
import { motion } from 'framer-motion';

const Servicios = ({ items }: ServiciosProps) => {
  const pathname = usePathname();

  const columns_classnames = cs(s.container__items, {
    [s.container__items__3_col]: pathname == '/'
  });

  return (
    <div className={s.container} id="servicios">
      <div className={s.container__title}>
        <h2>Servicios</h2>
        <h4>Experto en electricidad</h4>
      </div>
      <div className={columns_classnames}>
        {items.map((item, index) => (
          <motion.div
            whileInView={{
              opacity: [0, 1],
              transition: { duration: 1.75, delay: (index + 1) / 5 }
            }}
            key={item.label}
            className={s.container__items__item}>
            <div className={s.container__items__item__icon}>
              <ReactSVG className={s.container__items__item__icon__svg_container} src={item.svg} />
            </div>
            <p>{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Servicios;
