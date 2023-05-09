import { Icon16User, Icon20Cancel } from '@vkontakte/icons';
import { Avatar, Button, Group, Spacing, Textarea } from '@vkontakte/vkui';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useCreatePostMutation } from '@/services/post/post.service';
import type { CreatePostFormFields } from '@/types/create-post-form-fields.interface';

import UploadImageBlock from '../UploadImageBlock/UploadImageBlock';

import styles from './WritePostBlock.module.scss';

interface WritePostBlockProps {
  userImage?: string;
  activeWriteBlock: boolean;
  setActiveWriteBlock: React.Dispatch<React.SetStateAction<boolean>>;
}

const WritePostBlock: React.FC<WritePostBlockProps> = ({ activeWriteBlock, setActiveWriteBlock, userImage }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { control, getValues, handleSubmit, reset, setValue } = useFormContext<CreatePostFormFields>();
  const [image, setImage] = useState(getValues('image'));

  const [createPost] = useCreatePostMutation();

  const onSubmit = handleSubmit((postData: CreatePostFormFields) =>
    createPost(postData)
      .unwrap()
      .then(() => {
        reset();
        setActiveWriteBlock(false);
      })
  );

  const handleDelete = () => {
    setValue('image', null);
    setImage(null);
  };

  useOutsideClick(ref, () => setActiveWriteBlock((v) => !v), activeWriteBlock);

  if (!activeWriteBlock) return null;

  return (
    <Group separator='hide'>
      <div ref={ref} className={styles.root}>
        <div className={styles.header}>
          <div className={styles.top}>
            <Avatar fallbackIcon={<Icon16User />} size={28} src={userImage} />
            <Controller
              control={control}
              name='body'
              render={({ field: { onBlur, onChange, value } }) => (
                <Textarea className={styles.textarea} value={value as string} onBlur={onBlur} onChange={onChange} />
              )}
            />
          </div>
          <div className={clsx(styles.imageContainer, image && styles.isExist)}>
            {image && (
              <>
                <img alt='Фотография' className={styles.image} src={image} />
                <button className={styles.deleteButton} onClick={handleDelete}>
                  <Icon20Cancel />
                </button>
              </>
            )}
          </div>
        </div>
        <input className='hidden' />
        <Spacing size={32} />
        <div className={styles.footer}>
          <UploadImageBlock image={image} setImage={setImage} />
          <Button appearance='accent-invariable' size='m' onClick={onSubmit}>
            Опубликовать
          </Button>
        </div>
      </div>
    </Group>
  );
};

export default WritePostBlock;
