'use client';

import { useState, useTransition } from 'react';
import FormSubmitButton from '@/components/FormSubmitButton';

export default function CheckoutButton() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className='flex items-center gap-2'>
      <FormSubmitButton disabled={success} form='order' className='btn-block'>
        Checkout
      </FormSubmitButton>
      {isPending && <span className='loading loading-spinner loading-md' />}
      {!isPending && success && (
        <span className='text-success'>Checked out.</span>
      )}
    </div>
  );
}
