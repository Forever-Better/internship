import { Icon56LogoVkColor } from '@vkontakte/icons';

import IconBrand from '@/components/icons/IconBrand';

import styles from './Brand.module.scss';

const Brand = () => (
  <div className={styles.root}>
    <Icon56LogoVkColor width={40} />
    <IconBrand height={32} />
  </div>
);

export default Brand;
