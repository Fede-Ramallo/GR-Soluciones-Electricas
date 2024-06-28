import React, { useState, FC, useEffect, memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactSVG } from 'react-svg';
import cs from 'classnames';
import s from './Menu.module.css';
import { MenuType, MenuButtonProps } from '@/types/model';
import useIsMobile from '@/hooks/use-is-mobile';
import useLockScrollMenu from '@/hooks/use-lock-scroll-menu';
import { HeaderVariants, MenuVariants } from '@/lib/variants';

const MenuButton: FC<MenuButtonProps> = memo(({ open, onClick }) => {
  return (
    <motion.button
      className={s.menu__button}
      whileHover={{ scale: 0.9 }}
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      name={open ? 'button-close' : 'button-open'}>
      <ReactSVG
        style={open ? { fill: '#ffffff' } : { fill: '#020643' }}
        src={open ? '/icons/menu-cerrar.svg' : '/icons/menu.svg'}
      />
    </motion.button>
  );
});
MenuButton.displayName = 'MenuButton';

const MenuItem: FC<{ item: { label: string; href: string; id: number }; onClick: () => void }> = ({
  item,
  onClick
}) => {
  const handleScroll = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const destino = event.currentTarget.getAttribute('href');
    if (destino) {
      const elementoDestino = document.querySelector(destino);
      if (elementoDestino) {
        const offset = window.innerWidth < 768 ? 100 : 130;
        const posicion = elementoDestino.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: posicion,
          behavior: 'smooth'
        });
      }
    }
  }, []);

  return (
    <li onClick={onClick}>
      <a href={item.href} onClick={handleScroll} title={item.label}>
        {item.label}
      </a>
    </li>
  );
};
MenuItem.displayName = 'MenuItem';

const HEADER_ENTER_IN_SCREEN = 50;

const Menu: FC<MenuType> = ({ Items, showList }) => {
  const isMobile = useIsMobile();
  const [seleccionado, setSeleccionado] = useState(0);
  const [open, setOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const handleSelected = (id: number) => {
    setSeleccionado(id);
  };

  const handleScrolling = useCallback(() => {
    if (window.pageYOffset > window.innerHeight - HEADER_ENTER_IN_SCREEN) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScrolling);
    return () => {
      window.removeEventListener('scroll', handleScrolling);
    };
  }, [handleScrolling]);

  const className = cs(s.header, { [s.scrolled]: scrolled });
  const classNameDesktop = cs(s.headerDesktop, { [s.scrolled]: scrolled });

  const toggleMenu = useCallback(() => setOpen(!open), [open]);

  useLockScrollMenu(open);

  const menuList = useMemo(
    () => (
      <ul className={s.menu__lista}>
        {Items.map((item) => (
          <MenuItem key={item.label} item={item} onClick={toggleMenu} />
        ))}
      </ul>
    ),
    [Items, toggleMenu]
  );

  const mobileMenu = useMemo(
    () => (
      <motion.menu
        variants={MenuVariants}
        initial="closed"
        animate={open ? 'opened' : 'closed'}
        exit="closed"
        className={s.menu}>
        <div className={s.menu__header}>
          <MenuButton open={open} onClick={toggleMenu} />
        </div>
        {menuList}
        <ReactSVG className={s.menu__icon} src="/icons/logo-icon.svg" />
      </motion.menu>
    ),
    [menuList, open, toggleMenu]
  );

  return (
    <>
      {isMobile ? (
        <>
          <motion.header
            variants={HeaderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={className}>
            {showList && <MenuButton open={open} onClick={toggleMenu} />}
            <ReactSVG className={s.logo} src="/icons/logo.svg" />
          </motion.header>
          <AnimatePresence initial={false}>{open && mobileMenu}</AnimatePresence>
        </>
      ) : (
        <motion.header
          variants={HeaderVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={classNameDesktop}>
          <div className={s.headerDesktop__content}>
            <ReactSVG className={s.logo} src="/icons/logo.svg" />
            {showList && (
              <ul className={s.headerDesktop__lista}>
                {Items.map((item) => (
                  <MenuItem key={item.label} item={item} onClick={() => handleSelected(item.id)} />
                ))}
              </ul>
            )}
          </div>
        </motion.header>
      )}
    </>
  );
};
Menu.displayName = 'Menu';

export default Menu;
