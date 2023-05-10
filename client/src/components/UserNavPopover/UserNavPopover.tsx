import {
  Icon16DropdownOutline,
  Icon20User,
  Icon24DoorArrowRightOutline,
  Icon28EditOutline,
  Icon24UserCircleOutline
} from '@vkontakte/icons';
import {
  ActionSheet,
  ActionSheetDefaultIosCloseItem,
  ActionSheetItem,
  Avatar,
  CellButton,
  Separator,
  Spacing
} from '@vkontakte/vkui';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';

const UserNavPopover: React.FC = () => {
  const navigate = useNavigate();
  const popoutRef = useRef(null);
  const { user } = useAuth();
  const [isOpenPopout, setIsOpenPopout] = useState(false);
  const { logout } = useActions();

  if (!user) return null;

  return (
    <>
      <CellButton
        after={<Icon16DropdownOutline color='var(--vkui--color_icon_tertiary)' />}
        getRootRef={popoutRef}
        style={{ borderRadius: '0' }}
        onClick={() => setIsOpenPopout(true)}
      >
        <Avatar fallbackIcon={<Icon20User />} size={32} src={user.image} />
      </CellButton>{' '}
      {isOpenPopout && (
        <ActionSheet
          iosCloseItem={<ActionSheetDefaultIosCloseItem />}
          toggleRef={popoutRef}
          onClose={() => setIsOpenPopout(false)}
        >
          <ActionSheetItem
            autoClose
            before={<Icon24UserCircleOutline height={24} width={24} />}
            onClick={() => navigate(getPublicUrl.profile(user?.id))}
          >
            Моя страница
          </ActionSheetItem>
          <Spacing size={8} />
          <ActionSheetItem
            autoClose
            before={<Icon28EditOutline height={24} width={24} />}
            onClick={() => navigate(getPublicUrl.settings())}
          >
            Редактировать профиль
          </ActionSheetItem>
          <Spacing size={12}>
            <Separator wide />
          </Spacing>
          <ActionSheetItem before={<Icon24DoorArrowRightOutline />} onClick={() => logout()}>
            Выйти
          </ActionSheetItem>
        </ActionSheet>
      )}
    </>
  );
};

export default UserNavPopover;
