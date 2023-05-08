import { Icon24PlaceOutline, Icon24InfoCircleOutline, Icon28User } from '@vkontakte/icons';
import { Avatar, Button } from '@vkontakte/vkui';
import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FollowButton from '@/components/FollowButton/FollowButton';
import UserInfoModal from '@/components/UserInfoModal/UserInfoModal';
import { getPublicUrl } from '@/helpers/getPublicUrl';
import type { User } from '@/types/user.interface';

import styles from './HeaderBlock.module.scss';

type HeaderBlockProps = Pick<User, 'id' | 'image' | 'firstName' | 'lastName'> & {
  isOwner: boolean;
  isSubscribe: boolean;
};

const HeaderBlock: React.FC<HeaderBlockProps> = ({ firstName, id, image, isOwner, isSubscribe, lastName }) => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section className={clsx(styles.root, 'block-fluid')}>
      <div className={styles.top} />
      <div className={styles.bottom}>
        <div className={styles.userContainer}>
          <Avatar withBorder fallbackIcon={<Icon28User height={64} width={64} />} size={144} src={image} />
          <div className={styles.info}>
            <h1>
              {firstName}
              {` `}
              {lastName}
            </h1>
            <div className={styles.other}>
              <span>
                <Icon24PlaceOutline />
                Novgorod
              </span>
              <button onClick={() => setActiveModal('extended_info')}>
                <Icon24InfoCircleOutline />
                Подробнее
              </button>
            </div>
          </div>
        </div>
        <div className={styles.controls}>
          {!isOwner && (
            <>
              <Button size='l' onClick={() => navigate(getPublicUrl.dialogues())}>
                Сообщение
              </Button>
              <FollowButton hasSubscription={isSubscribe} userId={id} />
            </>
          )}
        </div>
      </div>
      <UserInfoModal activeModal={activeModal} closeModal={() => setActiveModal(null)} />
    </section>
  );
};

export default HeaderBlock;
