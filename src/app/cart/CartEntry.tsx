'use client';

import { CartItemWithProduct } from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import Image from 'next/image';
import Link from 'next/link';
import { setProductQuantity } from './actions';
import { useTransition } from 'react';

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product },
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <div className='flex flex-wrap items-center gap-3'>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className='rounded-lg'
        />
        <div>
          <Link href={'/products/' + product.id} className='font-bold'>
            {product.name}
          </Link>
          {product.availability !== 'AVAILABLE' && (
            <div className='badge badge-error ml-2'>{product.availability}</div>
          )}
          <div>Price: {formatPrice(product.price)}</div>
          <div className='my-1 flex items-center gap-2'>
            <button
              className='btn btn-ghost btn-xs text-error'
              onClick={() =>
                startTransition(async () => {
                  await setProductQuantity(product.id, 0);
                })
              }
            >
              Remove from cart
            </button>
          </div>
          {isPending && (
            <span className='loading loading-spinner loading-sm'></span>
          )}
        </div>
      </div>
      <div className='divider' />
    </div>
  );
}
