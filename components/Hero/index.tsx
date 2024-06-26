import { useState, useEffect, FC } from 'react';
import s from '../Hero/Hero.module.css';
import Image from 'next/image';
import { HeroProps } from '@/types/model';
import useDeviceSize from '@/hooks/useDeviceSize';

const Hero: FC<HeroProps> = ({ imageMobile, imageDesktop, videoMobile, videoDesktop, title, subTitle }) => {
  const arrayWidth = useDeviceSize();
  const width = arrayWidth[0];

  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    if (width >= 992) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [width, isMobile]);

  return (
    <section className={s.hero} id="inicio">
      <div className={s.hero__background}>
        {imageMobile &&
          imageDesktop &&
          (isMobile ? (
            <Image
              src={imageMobile.src}
              alt={imageMobile.alt}
              width={imageMobile.width}
              height={imageMobile.height}
            />
          ) : (
            <Image
              src={imageDesktop.src}
              alt={imageDesktop.alt}
              width={imageDesktop.width}
              height={imageDesktop.height}
            />
          ))}

        {videoMobile &&
          videoDesktop &&
          (isMobile ? (
            <>
              <video autoPlay muted loop>
                <source src={videoMobile.src} type={`video/${videoMobile.type}`} />
              </video>
            </>
          ) : (
            <>
              <video autoPlay muted loop>
                <source src={videoDesktop.src} type={`video/${videoDesktop.type}`} />
              </video>
            </>
          ))}
      </div>
      <div className={s.hero__content}>
        <h1>{title}</h1>
        <h4>{subTitle}</h4>
      </div>
    </section>
  );
};

export default Hero;
