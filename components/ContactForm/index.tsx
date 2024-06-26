import React, { FC, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import axios from 'axios';
import { ReactSVG } from 'react-svg';

import s from './ContactForm.module.css';
import { FloatingLabel, Checkbox, Button, Modal, Select } from '@/components';
import { ContactType, SocialItemType } from '@/types/model';
import { useModalState, useModalDispatch, toggleModal } from '@/context/ModalContext';
import { logEvent, getCampaignData } from '@/lib/helpers';

interface FormValues {
  name: string;
  lastname: string;
  city: string;
  phone: string;
  email: string;
  contact: string;
  checked: boolean;
}

interface ContactFormProps extends ContactType {}

const SocialIcon: FC<SocialItemType> = ({ id, url, icon, gaevent, caption }) => {
  const handleClick = (url: string, event: string) => {
    logEvent({ eventName: event });
    window.open(url, '_blank');
  };

  return (
    <motion.li custom={id} initial="hidden" animate="visible" className={s.social__list__item}>
      <motion.button
        className={s.social__list__item__button}
        whileTap={{ scale: 0.85 }}
        onClick={() => handleClick(url, gaevent)}
        aria-label={`Button ${caption}`}>
        <ReactSVG
          src={icon}
          className={s.social__list__item__icon}
          wrapper="span"
          beforeInjection={(svg) => {
            svg.classList.add('svg__icon');
          }}
        />
      </motion.button>
    </motion.li>
  );
};

const ContactForm: FC<ContactFormProps> = ({ phone, email, direction, social }) => {
  const { current } = useModalState();
  const dispatch = useModalDispatch();
  
  const contact = [
    { value: 'default', label: 'Interés' },
    { value: 'presupuesto', label: 'Presupuesto' },
    { value: 'consulta', label: 'Cónsulta' },
    { value: 'otro', label: 'Otro' },
  ];

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      lastname: '',
      city: '',
      phone: '',
      email: '',
      contact: contact[0].value,
      checked: false
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(2, 'Cantidad minima de caracteres: 2')
        .required('Nombre es obligatorio'),
      lastname: Yup.string()
        .min(2, 'Cantidad minima de caracteres: 2')
        .required('Apellido es obligatorio'),
      city: Yup.string().min(2, 'La Ciudad es obligatorio').required('Ciudad es obligatorio'),
      phone: Yup.string()
        .required('Teléfono es obligatorio.')
        .matches(phoneRegExp, 'El teléfono es requerido'),
      email: Yup.string()
        .email('La direccion de correo ingresada no es valida')
        .required('Email es obligatorio'),
      contact: Yup.string(),
      checked: Yup.boolean().required('Debe aceptar los terminos y condiciones')
    }),
    onSubmit: (values) => {
      sendContact(values);
    }
  });

  const isSubmitDisabled = () => {
    return (
      formik.isSubmitting ||
      !!(formik.errors.name && formik.touched.name) ||
      !!(formik.errors.lastname && formik.touched.lastname) ||
      !!(formik.errors.phone && formik.touched.phone) ||
      !!(formik.errors.city && formik.touched.city) ||
      !!(formik.errors.email && formik.touched.email) ||
      _.isEqual(formik.values.checked, false)
    );
  };

  const sendContact = useCallback(
    async (values: FormValues) => {
      try {
        const { name, lastname, city, email, phone, contact } = values;
        const campaign = getCampaignData();
        const prospect = _.isUndefined(campaign)
          ? { name, lastname, city, email, phone, contact }
          : { name, lastname, city, email, phone, contact, ...campaign };

        const {
          data: { error }
        } = await axios.post('/api/contact', prospect);

        if (error) {
          alert('Error al enviar los datos, vuelva a intentarlo mas tarde.');
        }

        logEvent({ eventName: '01_USER_SUBMIT_CONTACT_SUCCESS' });
        formik.resetForm();
        dispatch(toggleModal('modal-form'));
      } catch (error) {
        formik.resetForm();
        logEvent({ eventName: '02_USER_SUBMIT_CONTACT_ERROR' });
        alert('Error al enviar los datos, vuelva a intentarlo mas tarde.');
      }
    },
    [formik, dispatch]
  );

  return (
    <>
      <motion.div
        className={s.contact}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        id="contacto">
        <motion.div className={s.contact__wrapper}>
          <motion.div className={s.contact__container}>
            <h2 className={s.contact__title}>+ info</h2>
            <p>{phone}</p>
            <a
              onClick={() => logEvent({ eventName: '04_USER_PRESS_EMAIL_LINK' })}
              href={`mailto:${email}`}
              title={email}
              target="_blank"
              rel="noopener noreferrer">
              {email}
            </a>
            <p dangerouslySetInnerHTML={{ __html: direction }} />
            <motion.ul className={s.social__list}>
              {social && social.map((item) => <SocialIcon key={item.id} {...item} />)}
            </motion.ul>
          </motion.div>

          <motion.form
            className={s.contact__form}
            onReset={formik.handleReset}
            onSubmit={formik.handleSubmit}>
            <h2 className={s.contact__title}>Contacto</h2>
            <div className={s.contact__form}>
              <div className={s.contact__form__container}>
                <div className={s.contact__form__labels}>
                  <FloatingLabel
                    inputName="name"
                    dataType="name"
                    type="text"
                    placeholder="Nombre"
                    hasError={formik.touched.name}
                    errorMessage={formik.errors.name}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values.name}
                  />

                  <FloatingLabel
                    inputName="lastname"
                    dataType="lastname"
                    type="text"
                    placeholder="Apellido"
                    hasError={formik.touched.lastname}
                    errorMessage={formik.errors.lastname}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values.lastname}
                  />
                </div>
                <div className={s.contact__form__labels}>
                  <FloatingLabel
                    inputName="phone"
                    dataType="phone"
                    type="number"
                    placeholder="Teléfono"
                    hasError={formik.touched.phone}
                    errorMessage={formik.errors.phone}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />

                  <FloatingLabel
                    inputName="city"
                    dataType="data"
                    type="city"
                    placeholder="Ciudad"
                    hasError={formik.touched.city}
                    errorMessage={formik.errors.city}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values.city}
                  />
                </div>
              </div>

              <FloatingLabel
                inputName="email"
                dataType="data"
                type="email"
                placeholder="Email"
                hasError={formik.touched.email}
                errorMessage={formik.errors.email}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.email}
              />

              <Select
                inputName="contact"
                options={contact}
                value={formik.values.contact}
                handleChange={formik.handleChange}
              />
            </div>

            <Checkbox
              inputName="checked"
              handleChange={formik.handleChange}
              checked={formik.values.checked}
            />

            <div className={s.contact__button__wrapper}>
              <Button type="submit" secondary label="ENVIAR" disabled={isSubmitDisabled()} />
            </div>
          </motion.form>
        </motion.div>
      </motion.div>
      <AnimatePresence initial={false}>
        {current && _.isEqual(current, 'modal-form') && (
          <Modal key="modal-form">
            <div className={s.contact_modalInfo}>
              <p>
                <strong>Gracias!</strong> los datos se enviaron correctamente. Nos pondremos
                en contacto a la brevedad.
              </p>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactForm;