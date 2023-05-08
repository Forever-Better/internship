import {
  Icon20ArticleOutline,
  Icon20CommunityName,
  Icon20MentionOutline,
  Icon20MessageOutline,
  Icon20PlaceOutline,
  Icon24Cancel,
  Icon24Dismiss
} from '@vkontakte/icons';
import { MiniInfoCell, ModalPage, ModalPageHeader, ModalRoot, PanelHeaderButton, Separator } from '@vkontakte/vkui';
import React from 'react';

interface UserInfoModalProps {
  activeModal: string;
  closeModal: (modalId: string) => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ activeModal, closeModal }) => (
  <ModalRoot activeModal={activeModal} onClose={closeModal}>
    <ModalPage
      id='extended_info'
      header={
        <ModalPageHeader
          after={
            <PanelHeaderButton onClick={closeModal}>
              <Icon24Dismiss />
            </PanelHeaderButton>
          }
          before={
            <PanelHeaderButton onClick={closeModal}>
              <Icon24Cancel />
            </PanelHeaderButton>
          }
        >
          Подробнее
        </ModalPageHeader>
      }
    >
      <Separator style={{ marginBottom: 12 }} />

      <MiniInfoCell before={<Icon20CommunityName />} textWrap='full'>
        Команда вконтакте
      </MiniInfoCell>

      <MiniInfoCell before={<Icon20MessageOutline />} textWrap='full'>
        Официальная страница Команды ВКонтакте.
      </MiniInfoCell>

      <MiniInfoCell before={<Icon20ArticleOutline />} textWrap='full'>
        ВКонтакте начинался как сайт для выпускников вузов, а сейчас это огромная экосистема с безграничными
        возможностями и миллионами пользователей.
      </MiniInfoCell>

      <Separator style={{ marginTop: 12, marginBottom: 12 }} />

      <MiniInfoCell before={<Icon20PlaceOutline />}>Санкт-Петербург, Россия</MiniInfoCell>

      <MiniInfoCell before={<Icon20MentionOutline />}>team</MiniInfoCell>

      <div style={{ height: 24 }} />
    </ModalPage>
  </ModalRoot>
);

export default UserInfoModal;
