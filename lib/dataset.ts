import { DataSetType } from '@/types/model';

export const dataset: DataSetType = {
  Map: {
    ubication: 'Córdoba, Córdoba, Argentina',
    title: '¿Donde Encontrarnos?',
    subtitle: 'Hacemos trabajos dentro y fuera de Córdoba'
  },
  Menu: {
    Items: [
      {label: "Inicio", href: "#inicio", id: 1},
      {label: "Servicios", href: "#servicios", id: 2},
      {label: "Trabajos Realizados", href: "#slider", id: 3},
      {label: "Ubicación", href: "#map", id:4},
      {label: "Contacto", href: "#contacto", id: 5}],
    showList: true
  },
  Hero: {
    title: 'Soluciones eléctricas a tu alcance',
    subTitle: 'Desde reparaciones hasta instalaciones completas, estamos aquí para ayudarte',
    imageMobile: {
      src: '/images/hero-mobile.jpg',
      alt: 'background',
      width: 375,
      height: 650
    },
    imageDesktop: {
      src: '/images/hero-desktop.jpg',
      alt: 'background',
      width: 1440,
      height: 785
    },
    videoMobile: {
      src: '/videos/hero-mobile.mp4',
      type: 'mp4'
    },
    videoDesktop: {
      src: '/videos/hero-desktop.webm',
      type: 'webm'
    }
  },
  Servicios: {
    items: [
      {id: 'iluminacion', svg: '/icons/iluminacion.svg', label: 'Iluminación Doméstica'},
      {id: 'reparacion', svg: '/icons/reparacion.svg', label: 'Reparaciones Eléctricas'},
      {id: 'instalacion', svg: '/icons/tomacorrientes.svg', label: 'Instalación de Tomacorrientes'},
      {id: 'actualizacion', svg: '/icons/tablero.svg', label: 'Actualización de Tableros'},
      {id: 'certificaciones', svg: '/icons/certificaciones.svg', label: 'Certificaciones Eléctricas'},
      {id: 'mantenimiento', svg: '/icons/mantenimiento.svg', label: 'Mantenimiento Preventivo'},
    ]
  },
  Slider: {
    items: [
      { id: 1, image: '/images/trabajo1.jpg', imageMobile: "/images/trabajo1Mobile.jpg", alt: 'Image' },
      { id: 2, image: '/images/trabajo2.jpg', imageMobile: "/images/trabajo2Mobile.jpg",alt: 'Image' },
      { id: 3, image: '/images/trabajo3.jpg',imageMobile: "/images/trabajo3Mobile.jpg", alt: 'Image' },
      { id: 4, image: '/images/trabajo4.jpg', imageMobile: "/images/trabajo4Mobile.jpg",alt: 'Image' },
      { id: 5, image: '/images/trabajo5.jpg', imageMobile: "/images/trabajo5Mobile.jpg",alt: 'Image' },
      { id: 6, image: '/images/trabajo6.jpg', imageMobile: "/images/trabajo6Mobile.jpg",alt: 'Image' },
    ]
  },
  Contact: {
    phone: ['(+351) 153 967-959'],
    email: 'grsolucioneselectricas@gmail.com',
    direction:
      'Visítanos en <a href="https://maps.app.goo.gl/HP5MaRduDuiiPJqM7" title="dirección showroom" target="_blank" rel="noopener noreferrer">Dirección completa</a><br/>AR, Córdoba.',
    social: [
      {
        id: 1,
        caption: 'Facebook',
        url: 'https://www.facebook.com/people/GR-Soluciones-Electricas/100089339461272/',
        icon: '/icons/facebook.svg',
        gaevent: '05_USER_PRESS_SOCIAL_FACEBOOK'
      },
      {
        id: 2,
        caption: 'Instagram',
        url: 'https://instagram.com/gr_solucioneselectricas/',
        icon: '/icons/instagram.svg',
        gaevent: '06_USER_PRESS_SOCIAL_INSTAGRAM'
      },
      {
        id: 3,
        caption: 'LinkedIn',
        url: 'https://www.linkedin.com/in/garamallo-electricista/',
        icon: '/icons/linkedin.svg',
        gaevent: '07_USER_PRESS_SOCIAL_LINKEDIN'
      }
    ]
  }
};
