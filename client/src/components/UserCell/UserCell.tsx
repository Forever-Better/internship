import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './UserCell.module.scss';

interface UserCellProps {
  /**
   * Иконка 12 или `<Badge />`. Добавится справа от текста `children`.
   */
  badgeAfterTitle?: React.ReactNode;
  subtitle?: React.ReactNode;
  avatar?: React.ReactNode;
  after?: React.ReactNode;
  children: React.ReactNode;
  padding?: boolean;
  bold?: boolean;
  href: string;
}

const UserCell: React.FC<UserCellProps & React.HTMLProps<HTMLDivElement>> = ({
  after,
  avatar,
  badgeAfterTitle,
  bold,
  children,
  className,
  href,
  padding,
  subtitle,
  ...restProps
}) => (
  <div className={clsx(styles.userCell, className)} {...restProps}>
    <div className={clsx(styles.container, padding && styles.padding)}>
      <div className={styles.wrap}>
        <div className={styles.start}>
          <Link to={href}>{avatar}</Link>
          <div className={styles.main}>
            <div className={styles.content}>
              <Link to={href}>
                <span className={clsx(styles.title, bold && styles.bold)}>{children}</span>
              </Link>
              <span className={styles.badge}>{badgeAfterTitle}</span>
            </div>
            <div className={styles.content}>
              <span className={styles.subtitle}>{subtitle}</span>
            </div>
          </div>
        </div>
        <div className={styles.end}>{after}</div>
      </div>
    </div>
  </div>
);

export default UserCell;
