// fonts
import localFont from 'next/font/local';

export const Optima = localFont({
  src: [
    {
      path: '../public/fonts/Optima-Regular.woff2',
      weight: 'normal',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-optima',
  preload: true
});

export const Mulish = localFont({
  src: [
    {
      path: '../public/fonts/Mulish-Regular.woff2',
      weight: 'normal',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-mulish',
  preload: true
});
