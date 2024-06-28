import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import s from './Footer.module.css';

const Footer = () => {
  const fecha = new Date();
  const año = fecha.getFullYear();

  return (
    <div className={s.footer_container}>
      <footer className={s.footer}>
        <div className={s.footer__content}>
          <nav className={s.footer__content__nav}>
            <p>Copyright © {año}</p>
            {/* <Link href="/aviso-de-privacidad">Aviso de privacidad</Link> */}
          </nav>
          <div className={s.footer__content__copy}>
            <p>Desarrollado por</p>
            <Link
              href="https://www.linkedin.com/in/federico-ramallo-front-end-developer/"
              title="#"
              target="_blank">
              Federico Ramallo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
