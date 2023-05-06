import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { CreatePostFormFields } from '@/types/create-post-form-fields.interface';

import Holder from './Holder/Holder';
import WritePostBlock from './WritePostBlock/WritePostBlock';

interface CreatePostBlockProps {
  userImage?: string;
}

const CreatePostBlock: React.FC<CreatePostBlockProps> = ({ userImage }) => {
  const [activeWriteBlock, setActiveWriteBlock] = useState(false);
  const methods = useForm<CreatePostFormFields>({ defaultValues: { body: null, image: null } });

  return activeWriteBlock ? (
    <FormProvider {...methods}>
      <WritePostBlock
        activeWriteBlock={activeWriteBlock}
        setActiveWriteBlock={setActiveWriteBlock}
        userImage={userImage}
      />
    </FormProvider>
  ) : (
    <Holder setActiveWriteBlock={setActiveWriteBlock} userImage={userImage} />
  );
};

export default CreatePostBlock;
