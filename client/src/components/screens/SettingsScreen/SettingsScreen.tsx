import { Group, Spacing } from '@vkontakte/vkui';

import { useGetMeQuery } from '@/services/user/user.service';

import Form from './Form/Form';
import styles from './SettingsScreen.module.scss';

const SettingsScreen = () => {
  const { data, isLoading } = useGetMeQuery();

  if (isLoading) return null;

  if (!data) return null;

  return (
    <div className={styles.root}>
      <Spacing size={16} />
      <div className='layout'>
        <Group className={styles.group}>
          <div className={styles.container}>
            <Form data={data} />
          </div>{' '}
          <Spacing size={32} />
        </Group>
      </div>
    </div>
  );
};

export default SettingsScreen;
