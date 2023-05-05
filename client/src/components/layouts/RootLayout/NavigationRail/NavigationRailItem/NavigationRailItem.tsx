import styles from './NavigationRailItem.module.scss';

const NavigationRailItem: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className={styles.root}>{children}</div>
);

export default NavigationRailItem;
