'use client';

import { MdDelete } from 'react-icons/md';
import { useState, useTransition } from 'react';

interface DeleteProductButtonProps {
  productId: string;
  deleteProduct: (productId: string) => Promise<{ error: string }>;
}

export default function DeleteProductButton({
  productId,
  deleteProduct,
}: DeleteProductButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className='flex items-center gap-2'>
      <button
        className={`btn w-full ${success ? 'bg-transparent text-red-500' : 'bg-red-500 text-white'} hover:bg-red-600`}
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await deleteProduct(productId);
            setSuccess(true);
          });
        }}
      >
        Delete
        <MdDelete className='text-muted ms-auto' />
      </button>
      {isPending && <span className='loading loading-spinner loading-md' />}
      {!isPending && success && (
        <span className='text-sm text-red-500'>Deleted.</span>
      )}
    </div>
  );
}
