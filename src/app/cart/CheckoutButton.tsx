'use client';

import { ShoppingCart } from '@/lib/db/cart';
import { useState, useTransition } from 'react';
import { deleteCart } from './actions';

interface CheckoutButtonProps {
  cart: ShoppingCart | null;
  sendEmail: (cart: ShoppingCart) => Promise<void>;
  deleteCart: (cartId: string) => Promise<void>;
}

export default function CheckoutButton({
  cart,
  sendEmail,
}: CheckoutButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  return (
    <div className='flex items-center gap-2'>
      <button
        disabled={success}
        className='btn btn-primary sm:w-[200px]'
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            if (!cart) {
              throw new Error('Cart is empty');
            }
            await sendEmail(cart);
            await deleteCart(cart.id);
            setSuccess(true);
          });
        }}
      >
        Checkout
      </button>
      {isPending && <span className='loading loading-spinner loading-md' />}
      {!isPending && success && (
        <span className='text-success'>Checked out.</span>
      )}
    </div>
  );
}
