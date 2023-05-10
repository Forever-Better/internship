import { Icon24PicturePlusOutline } from '@vkontakte/icons';
import { IconButton } from '@vkontakte/vkui';
import { useCallback, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { useUploadFileMutation } from '@/services/file/file.service';
import type { CreatePostFormFields } from '@/types/create-post-form-fields.interface';

interface UploadImageBlockProps {
  image?: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null | undefined>>;
}

const UploadImageBlock: React.FC<UploadImageBlockProps> = ({ image, setImage }) => {
  const filePicker = useRef<HTMLInputElement | null>(null);
  const { register, setValue } = useFormContext<CreatePostFormFields>();

  const [uploadFile] = useUploadFileMutation();

  const handleUpload = useCallback(() => {
    if (!filePicker?.current?.files) return;

    const formData = new FormData();
    formData.append('image', filePicker?.current?.files[0]);

    uploadFile(formData)
      .unwrap()
      .then(({ file }) => {
        setValue('image', file.url);
        setImage(file.url);
      });
  }, [setImage, filePicker, setValue, uploadFile]);

  const { ref, ...rest } = register('image', { onChange: handleUpload });

  const handlePick = () => {
    filePicker.current?.click();
  };

  return (
    <>
      <input
        ref={(e) => {
          ref(e);
          filePicker.current = e;
        }}
        className='hidden'
        type='file'
        {...rest}
      />

      <IconButton disabled={!!image} onClick={handlePick}>
        <Icon24PicturePlusOutline />
      </IconButton>
    </>
  );
};

export default UploadImageBlock;
