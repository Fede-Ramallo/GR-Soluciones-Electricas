import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, lastname, city, phone, email, contact } = req.body;

    console.log('data mail' + process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'grsoluciones.electricas@gmail.com', // Cambia esto al correo deseado
      subject: `Contacto de: ${contact}`,
      text: `Nombre: ${name} ${lastname}\nCiudad: ${city}\nTeléfono: ${phone}\nEmail: ${email}\nTipo de contacto: ${contact}`
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email enviado con éxito' });
    } catch (error) {
      console.error('Error enviando el email:', error);
      res.status(500).json({ error: 'Error enviando el email' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
