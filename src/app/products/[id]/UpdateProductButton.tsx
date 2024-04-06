'use client';

import { AiFillEdit } from 'react-icons/ai';
import { useState, useTransition } from 'react';

interface UpdateProductButtonProps {
  productId: string;
  updateProduct: (productId: string) => Promise<{ error: string }>;
}

export default function UpdateProductButton({
  productId,
  updateProduct,
}: UpdateProductButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className='flex items-center gap-2'>
      <button
        className={`mb-2 btn w-full ${success ? 'bg-transparent text-green-500' : 'bg-green-500 text-white'} hover:bg-green-600`}
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await updateProduct(productId);
            setSuccess(true);
          });
        }}
      >
        Update
        <AiFillEdit className='text-muted ms-auto' />
      </button>
      {isPending && <span className='loading loading-spinner loading-md' />}
      {!isPending && success && (
        <span className='text-success'>Transfered to update page.</span>
      )}
    </div>
  );
}
