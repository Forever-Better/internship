import { Icon28User } from '@vkontakte/icons';
import { Avatar, Group, Header, HorizontalCell, HorizontalScroll } from '@vkontakte/vkui';
import { useNavigate } from 'react-router-dom';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import type { User } from '@/types/user.interface';

const FriendsBlock: React.FC<{ data: User[] }> = ({ data }) => {
  const navigate = useNavigate();

  if (!data.length) return null;

  return (
    <section>
      <Group header={<Header>Подписки</Header>}>
        <HorizontalScroll>
          <div style={{ display: 'flex', maxWidth: '320px', height: 'fit-content' }}>
            {data.map((user) => (
              <HorizontalCell
                key={user.id}
                header={user.firstName}
                size='s'
                onClick={() => navigate(getPublicUrl.profile(user.id))}
              >
                <Avatar fallbackIcon={<Icon28User />} size={56} src={user.image} />
              </HorizontalCell>
            ))}
          </div>
        </HorizontalScroll>
      </Group>
    </section>
  );
};

export default FriendsBlock;
