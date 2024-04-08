'use client';
import { formatPrice } from '@/lib/format';
import { useState, ChangeEvent } from 'react';

interface PriceInputProps {
  defaultValue: number;
}

export default function PriceInput({ defaultValue }: PriceInputProps) {
  const [price, setPrice] = useState(defaultValue);

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  return (
    <div>
      <input
        required
        name='price'
        placeholder='Price in cents'
        type='number'
        className='mb-3 w-full input input-bordered'
        onChange={handlePriceChange}
        defaultValue={defaultValue}
      />
      <p style={{ marginBottom: '10px', marginLeft: '4px' }}>
        {formatPrice(price)}
      </p>
    </div>
  );
}
