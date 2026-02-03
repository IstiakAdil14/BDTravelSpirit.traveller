import { 
  FiFile, 
  FiGlobe, 
  FiHeart,
  FiBell,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiMapPin,
  FiCalendar,
  FiStar,
  FiArrowRight,
  FiPhone,
  FiMail,
  FiInstagram,
  FiFacebook,
  FiTwitter
} from 'react-icons/fi';

import {
  HiOutlineGlobeAlt,
  HiOutlineDocumentText,
  HiOutlineWindow
} from 'react-icons/hi2';

// Icon mapping for easy replacement
export const Icons = {
  file: FiFile,
  globe: FiGlobe,
  window: HiOutlineWindow,
  heart: FiHeart,
  bell: FiBell,
  cart: FiShoppingCart,
  menu: FiMenu,
  close: FiX,
  search: FiSearch,
  user: FiUser,
  location: FiMapPin,
  calendar: FiCalendar,
  star: FiStar,
  arrowRight: FiArrowRight,
  phone: FiPhone,
  mail: FiMail,
  instagram: FiInstagram,
  facebook: FiFacebook,
  twitter: FiTwitter,
  globeAlt: HiOutlineGlobeAlt,
  document: HiOutlineDocumentText,
};

export type IconName = keyof typeof Icons;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className = "" }: IconProps) {
  const IconComponent = Icons[name];
  return <IconComponent size={size} className={className} />;
}