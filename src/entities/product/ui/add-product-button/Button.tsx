import React from 'react';
import { Button, Modal } from '@/shared/ui';
import { AddProductForm } from '../add-product-form';
import { PlusIcon } from '@/shared/assets/icons';

export const AddProductButton = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button color='primary' onClick={() => setOpen(true)} icon={<PlusIcon />}>
        Добавить товар
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className='modal-box w-full max-w-md'
      >
        <h3 className='font-bold text-lg mb-4'>Новый товар</h3>
        <AddProductForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
};
