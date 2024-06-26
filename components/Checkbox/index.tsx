import React, { FC } from 'react';

import styles from './Checkbox.module.css';

interface PageTranslates {
  handleChange?: (e: React.ChangeEvent<any>) => void; // eslint-disable-line no-unused-vars
  checked: boolean;
  inputName: string;
}

const Checkbox: FC<PageTranslates> = ({ inputName, handleChange, checked }) => {
  return (
    <>
      <div className={styles.checkbox_container}>
        <div className={styles.container}>
          <input type="checkbox" name={inputName} checked={checked} onChange={handleChange} />
          <label htmlFor={inputName}>
            <div></div>
          </label>
        </div>
        <span className={styles.checkbox_info}>
          <a
            title="Aviso de Privacidad"
            href="https://www.unitygroup.com.mx/politica-de-privacidad/"
            target="_blank"
            rel="noopener noreferrer">
            &nbsp;Acepto Aviso de Privacidad
          </a>
        </span>
      </div>
    </>
  );
};

export default Checkbox;
