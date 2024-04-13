'use client';

import FormSubmitButton from '@/components/FormSubmitButton';
import PriceInput from '@/components/PriceInput';
import { toSlug } from '@/lib/utils';
import { nanoid } from 'nanoid';
import path from 'path';
import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import { addProduct } from './actions';

export default function AddProductPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <div>
      <h1 className='text-lg mb-3 font-bold'>Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name='name'
          placeholder='Name'
          ref={inputNameRef}
          className='mb-3 w-full input input-bordered'
        />
        <textarea
          required
          name='description'
          placeholder='Description'
          className='textarea textarea-bordered mb-3 w-full'
        />
        <input
          required
          name='imageUrl'
          placeholder='Image URL'
          type='url'
          defaultValue={blob?.url}
          className='mb-3 w-full input input-bordered'
        />
        <input
          className='file-input'
          style={{ marginBottom: '10px', marginLeft: '4px' }}
          name='productImage'
          ref={inputFileRef}
          type='file'
        />
        <button
          className='btn btn-primary'
          style={{ marginBottom: '10px', marginLeft: '12px' }}
          type='submit'
          onClick={async (event) => {
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

            setBlob(newBlob);
          }}
        >
          Upload
        </button>
        <PriceInput defaultValue={0} />
        <FormSubmitButton className='btn-block'>Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
