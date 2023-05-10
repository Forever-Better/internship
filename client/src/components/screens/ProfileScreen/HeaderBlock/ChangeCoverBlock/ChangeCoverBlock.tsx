import { Icon28EditOutline, Icon20PictureOutline, Icon20DeleteOutline } from '@vkontakte/icons';
import { Button, Div, Spinner } from '@vkontakte/vkui';
import { Popover } from '@vkontakte/vkui/dist/components/Popover/Popover';
import { useCallback, useRef } from 'react';

import { useUploadFileMutation } from '@/services/file/file.service';
import { useUpdateCoverMutation } from '@/services/user/user.service';

import styles from './ChangeCoverBlock.module.scss';

interface ChangeCoverBlockProps {
  cover: string | null;
}

const ChangeCoverBlock: React.FC<ChangeCoverBlockProps> = ({ cover }) => {
  const filePicker = useRef<HTMLInputElement | null>(null);

  const [uploadFile, { isLoading: uploadFileLoading }] = useUploadFileMutation();
  const [updateCover, { isLoading: updateCoverLoading }] = useUpdateCoverMutation();

  const handleUpload = useCallback(() => {
    if (!filePicker?.current?.files) return;

    const formData = new FormData();
    formData.append('image', filePicker?.current?.files[0]);

    uploadFile(formData)
      .unwrap()
      .then(({ file }) => {
        updateCover(file.url);
      });
  }, [filePicker, uploadFile, updateCover]);

  const handlePick = () => {
    filePicker.current?.click();
  };

  if (uploadFileLoading || updateCoverLoading) return <Spinner size='regular' />;

  return (
    <>
      {' '}
      <Popover
        action='hover'
        placement='bottom'
        content={
          <Div className={styles.plate}>
            <Button
              appearance='neutral'
              before={<Icon20PictureOutline />}
              mode='tertiary'
              size='m'
              onClick={handlePick}
            >
              Выбрать изображение
            </Button>
            <Button
              stretched
              align='left'
              appearance='negative'
              before={<Icon20DeleteOutline />}
              disabled={!cover}
              mode='tertiary'
              size='m'
              onClick={() => updateCover(null)}
            >
              Удалить
            </Button>
          </Div>
        }
      >
        <Button
          appearance='neutral'
          before={<Icon28EditOutline height={24} width={24} />}
          size='m'
          style={{ margin: 20 }}
        >
          Изменить обложку
        </Button>
      </Popover>
      <input ref={filePicker} className='hidden' type='file' onChange={handleUpload} />
    </>
  );
};

export default ChangeCoverBlock;
