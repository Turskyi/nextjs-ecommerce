'use client';

import FormSubmitButton from '@/components/FormSubmitButton';
import PriceInput from '@/components/PriceInput';
import { toSlug } from '@/lib/utils';
import { nanoid } from 'nanoid';
import path from 'path';
import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { addProduct } from './actions';

export default function AddProductPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [clientError, setClientError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [state, formAction] = useFormState(addProduct, null);

  // Clear client error when server state changes (e.g. new submission)
  useEffect(() => {
    if (state?.error) {
      setClientError(null);
    }
  }, [state]);

  const displayError = clientError || state?.error;

  return (
    <div>
      <h1 className='text-lg mb-3 font-bold'>Add Product</h1>
      {displayError && (
        <div className='alert alert-error mb-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current shrink-0 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>{displayError}</span>
        </div>
      )}
      <form
        action={(formData) => {
          setClientError(null);

          // Pre-submission client-side validation
          const name = formData.get('name')?.toString();
          const description = formData.get('description')?.toString();
          const price = Number(formData.get('price'));
          const currentImageUrl = formData.get('imageUrl')?.toString();
          const file = formData.get('productImage') as File;

          if (!name || !description || price <= 0) {
            setClientError('Name, description, and price (> 0) are required.');
            return;
          }

          if (!currentImageUrl && (!file || file.size === 0)) {
            setClientError('Image URL or uploaded image is required.');
            return;
          }

          if (file && file.size > 4.5 * 1024 * 1024 && !currentImageUrl) {
             setClientError('Image file is too large (max 4.5MB). Please upload a smaller image or provide a URL.');
             return;
          }

          formAction(formData);
        }}
      >
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
          name='imageUrl'
          placeholder='Image URL'
          type='url'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className='mb-3 w-full input input-bordered'
        />
        <input
          className='file-input'
          style={{ marginBottom: '10px', marginLeft: '4px' }}
          name='productImage'
          ref={inputFileRef}
          type='file'
          onChange={() => {
            setClientError(null);
            if (state) state.error = null; // Reset server error on change
          }}
        />
        <button
          className='btn btn-primary'
          style={{ marginBottom: '10px', marginLeft: '12px' }}
          type='button'
          disabled={isUploading}
          onClick={async (event) => {
            event.preventDefault();
            setClientError(null);
            const name = inputNameRef?.current?.value;
            if (!name) {
              setClientError('First enter the name');
              return;
            }

            if (!inputFileRef.current?.files || inputFileRef.current.files.length === 0) {
              setClientError('No file selected');
              return;
            }
            
            const productImage = inputFileRef.current.files[0];

            if (productImage.size > 4.5 * 1024 * 1024) {
              setClientError('File is too large. Maximum size is 4.5MB.');
              return;
            }

            try {
              setIsUploading(true);
              const slug = `${toSlug(name)}-${nanoid(10)}`;
              const response = await fetch(
                `/api/image/upload?filename=product_images/${slug}${path.extname(productImage.name)}`,
                {
                  method: 'POST',
                  body: productImage,
                },
              );

              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
              }

              const newBlob = (await response.json()) as PutBlobResult;

              setBlob(newBlob);
              setImageUrl(newBlob.url);
            } catch (e: any) {
              setClientError(e.message);
            } finally {
              setIsUploading(false);
            }
          }}
        >
          {isUploading && <span className='loading loading-spinner' />}
          Upload
        </button>
        <PriceInput defaultValue={0} />
        <FormSubmitButton className='btn-block'>Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
