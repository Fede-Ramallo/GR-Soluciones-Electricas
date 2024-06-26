import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Optima, Mulish } from '@/lib/fonts';
import { AppData } from '@/lib/constants';
import { ModalContextProvider } from '@/context/ModalContext';

function handleExitComplete() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 });
  }
}

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
        <style jsx global>
          {`
            :root {
              --font-optima: ${Optima.style.fontFamily};
              --font-mulish: ${Mulish.style.fontFamily};
            }
          `}
        </style>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>{AppData.title}</title>
      </Head>

      {/* Google Tag Manager */}
      {AppData.gtagId && (
        <Script id="google-analytics" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer', '${AppData.gtagId}');`}
        </Script>
      )}
      {/* Google Tag Manager */}
      <ModalContextProvider>
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </ModalContextProvider>
    </>
  );
}

export default App;
