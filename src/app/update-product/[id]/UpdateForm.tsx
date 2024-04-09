'use client';

import FormSubmitButton from '@/components/FormSubmitButton';
import PriceInput from '@/components/PriceInput';
import { toSlug } from '@/lib/utils';
import { nanoid } from 'nanoid';
import path from 'path';
import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import { updateProduct } from './actions';

type Product = {
  id: string;
  description: string;
  imageUrl: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

type UpdateFormProps = {
  product: Product;
};

export default function UpdateForm({ product }: UpdateFormProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <form action={updateProduct}>
      {/* Hidden input field for product ID */}
      <input type='hidden' name='productId' value={product.id} />
      <input
        required
        name='name'
        placeholder='Name'
        defaultValue={product.name}
        ref={inputNameRef}
        className='mb-3 w-full input input-bordered'
      />
      <textarea
        required
        name='description'
        placeholder='Description'
        defaultValue={product.description}
        className='textarea textarea-bordered mb-3 w-full'
      />
      <input
        required
        name='imageUrl'
        placeholder='Image URL'
        type='url'
        value={blob?.url}
        defaultValue={product.imageUrl}
        className='mb-3 w-full input input-bordered'
      />
      <input
        className='file-input'
        style={{ marginBottom: '10px', marginLeft: '4px' }}
        name='productImage'
        ref={inputFileRef}
        type='file'
        required
      />
      <button
        className='btn btn-primary'
        style={{ marginBottom: '10px', marginLeft: '12px' }}
        type='submit'
        onClick={async (event) => {
          console.log('Deb: click');
          event.preventDefault();
          const name = inputNameRef?.current?.value;
          if (!name) {
            throw new Error('First enter the name');
          }
          const slug = `${toSlug(name)}-${nanoid(10)}`;

          if (!inputFileRef.current?.value || !inputFileRef.current?.files) {
            throw new Error('No file selected');
          }
          const productImage = inputFileRef.current.files[0];
          const response = await fetch(
            `/api/image/upload?filename=product_images/${slug}${path.extname(productImage.name)}`,
            {
              method: 'POST',
              body: productImage,
            },
          );

          const newBlob = (await response.json()) as PutBlobResult;
          console.log('Deb: update');
          setBlob(newBlob);
        }}
      >
        Upload
      </button>
      <PriceInput defaultValue={product.price} />
      <FormSubmitButton className='btn-block'>Update Product</FormSubmitButton>
    </form>
  );
}
