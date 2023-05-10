import { Icon24Camera, Icon28User } from '@vkontakte/icons';
import { Avatar, Button, FormItem } from '@vkontakte/vkui';
import { useCallback, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { useUploadFileMutation } from '@/services/file/file.service';
import { ProfileForm } from '@/types/enums';
import type { UpdateProfileFormFields } from '@/types/update-profile-form-fields.interface';

import styles from './ImageUploadBlock.module.scss';

interface ImageUploadBlockProps {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUploadBlock: React.FC<ImageUploadBlockProps> = ({ image, setImage }) => {
  const { register, setValue } = useFormContext<UpdateProfileFormFields>();
  const filePicker = useRef<HTMLInputElement | null>(null);

  const [uploadFile] = useUploadFileMutation();

  const handleUpload = useCallback(() => {
    if (!filePicker?.current?.files) return;

    const formData = new FormData();
    formData.append('image', filePicker?.current?.files[0]);

    uploadFile(formData)
      .unwrap()
      .then(({ file }) => {
        setValue(ProfileForm.IMAGE, file.url);
        setImage(file.url);
      });
  }, [setImage, filePicker, setValue, uploadFile]);

  const { ref, ...rest } = register(ProfileForm.IMAGE, { onChange: handleUpload });

  const handlePick = () => {
    filePicker.current?.click();
  };

  return (
    <div className={styles.root}>
      <Avatar fallbackIcon={<Icon28User height={36} width={36} />} size={92} src={image} />
      <FormItem top='Загрузите ваше фото'>
        <Button before={<Icon24Camera role='presentation' />} size='m' onClick={handlePick}>
          Открыть галерею
        </Button>
        <input
          ref={(e) => {
            ref(e);
            filePicker.current = e;
          }}
          className='hidden'
          type='file'
          {...rest}
        />
      </FormItem>
    </div>
  );
};

export default ImageUploadBlock;
