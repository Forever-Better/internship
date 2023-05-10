import {
  Icon20ArticleOutline,
  Icon20EducationOutline,
  Icon20MentionOutline,
  Icon20DiamondOutline,
  Icon20PlaceOutline,
  Icon24Cancel
} from '@vkontakte/icons';
import {
  MiniInfoCell,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeaderButton,
  Separator,
  useAdaptivityConditionalRender
} from '@vkontakte/vkui';
import React from 'react';

import { plural } from '@/helpers/plural';
import type { User } from '@/types/user.interface';

interface UserInfoModalProps {
  activeModal: string;
  closeModal: any;
  info: User;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ activeModal, closeModal, info }) => {
  const { sizeX } = useAdaptivityConditionalRender();

  return (
    <ModalRoot activeModal={activeModal} onClose={closeModal}>
      <ModalPage
        id='extended_info'
        header={
          <ModalPageHeader
            before={
              sizeX.compact && (
                <PanelHeaderButton onClick={closeModal}>
                  <Icon24Cancel />
                </PanelHeaderButton>
              )
            }
          >
            Подробнее
          </ModalPageHeader>
        }
      >
        <Separator style={{ marginBottom: 12 }} />

        <MiniInfoCell before={<Icon20ArticleOutline />} textWrap='full'>
          {info?.status}
        </MiniInfoCell>
        <MiniInfoCell before={<Icon20MentionOutline />}>React Team</MiniInfoCell>
        <Separator style={{ marginTop: 12, marginBottom: 12 }} />
        <MiniInfoCell before={<Icon20DiamondOutline />}>
          {info.age ? (
            <>
              {info.age} {plural(info.age, ['год', 'года', 'лет', 'лет'])}
            </>
          ) : (
            'Не указан'
          )}
        </MiniInfoCell>
        <MiniInfoCell before={<Icon20PlaceOutline />}>{info.city ?? 'Не указан'}</MiniInfoCell>
        <MiniInfoCell before={<Icon20EducationOutline />}>{info.university ?? 'Не указан'}</MiniInfoCell>
        <div style={{ height: 24 }} />
      </ModalPage>
    </ModalRoot>
  );
};

export default UserInfoModal;
