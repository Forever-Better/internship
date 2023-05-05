import { Icon32LogoVkColor } from '@vkontakte/icons';

import IconBrand from '@/components/icons/IconBrand';

import styles from './Brand.module.scss';

const Brand = () => (
  <div className={styles.root}>
    <Icon32LogoVkColor height={36} width={36} />
    <IconBrand height={20} />
  </div>
);

export default Brand;
