// model
export interface App {
  name: string;
  title: string;
  description: string;
  siteUrl: string;
  keywords: string;
  shareMessage: string;
  wspNumber: string;
  wspMessage: string;
  images?: {
    image_600: string;
    image_1024x512: string;
    image_1080x1080: string;
  };
  gtagId?: string;
  fbAppId?: string;
}

export type MapProps = {
  ubication?: string;
  title?: string;
  subtitle?: string;
};
export interface SliderItem {
  id: number;
  image: string;
  imageMobile: string;
  alt: string;
}

export interface SliderProps {
  items: SliderItem[];
}

export interface ServiciosItems {
  id: string;
  svg: string;
  label: string;
}

export interface ServiciosProps{
  items: ServiciosItems[];
}

export interface ArrowProps {
  disabled?: boolean;
  left?: boolean;
  alternative?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick: (e: any) => void;
}

export type DataSetType = {
  Hero: HeroProps;
  Slider: SliderProps;
  Servicios: ServiciosProps;
  Map: MapProps;
  Contact: ContactType;
  Menu: MenuType;
};

export interface MenuType {
  Items: {
    label: string;
    href: string;
    id: number;
  }[];
  showList?: boolean;
}

export interface MenuButtonProps {
  open: boolean;
  onClick: () => void;
}

export type HeroProps = {
  title?: string;
  subTitle?: string;
  imageMobile?: heroImage;
  imageDesktop?: heroImage;
  videoMobile?: heroVideo;
  videoDesktop?: heroVideo;
};

export type heroImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type heroVideo = {
  src: string;
  type: string;
};

export type ButtonProps = {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  secondary?: boolean;
  type?: 'button' | 'submit';
};

export type SocialItemType = {
  id: number;
  caption: string;
  url: string;
  icon: string;
  gaevent: string;
};

export type ContactType = {
  phone: string[];
  email: string;
  direction: string;
  social: SocialItemType[];
};
 
// Campaign
export interface Campaign {
  utm_source?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_medium?: string;
  utm_content?: string;
}