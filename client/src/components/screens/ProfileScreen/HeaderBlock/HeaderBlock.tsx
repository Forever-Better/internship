import { Icon24PlaceOutline, Icon24InfoCircleOutline, Icon28User } from '@vkontakte/icons';
import { Avatar, Button, Group, SplitLayout } from '@vkontakte/vkui';
import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FollowButton from '@/components/FollowButton/FollowButton';
import UserInfoModal from '@/components/UserInfoModal/UserInfoModal';
import { getPublicUrl } from '@/helpers/getPublicUrl';
import type { User } from '@/types/user.interface';

import styles from './HeaderBlock.module.scss';

interface HeaderBlockProps {
  info: User;
  isOwner: boolean;
  isSubscribe: boolean;
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({ info, isOwner, isSubscribe }) => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState('');

  return (
    <section>
      <Group separator='hide'>
        <div className={clsx(styles.root, 'block-fluid')}>
          <div className={styles.top} />
          <div className={styles.bottom}>
            <div className={styles.userContainer}>
              <Avatar withBorder fallbackIcon={<Icon28User height={64} width={64} />} size={144} src={info.image} />
              <div className={styles.info}>
                <h1>
                  {info.firstName}
                  {` `}
                  {info.lastName}
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
                  <FollowButton hasSubscription={isSubscribe} userId={info.id} />
                </>
              )}
            </div>
          </div>
        </div>
      </Group>
      <SplitLayout
        modal={<UserInfoModal activeModal={activeModal} closeModal={() => setActiveModal('')} info={info} />}
      />
    </section>
  );
};

export default HeaderBlock;
