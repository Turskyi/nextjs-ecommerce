'use client';

import Head from 'next/head';
import { useState, useTransition } from 'react';
import { sendContactEmail } from './actions';
import FormSubmitButton from '@/components/FormSubmitButton';

export default function Contact() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Update form data as user types
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    const email = formData.email;
    const name = formData.name;
    const message = formData.message;

    if (!email || !name || !message) {
      throw Error('Missing required fields.');
    }
    startTransition(async () => {
      await sendContactEmail({
        email: email,
        name: name,
        message: message,
      });
      setSuccess(true);
    });
  };

  return (
    <div className='bg-body background-color text-body color p-5'>
      <Head>
        <title>Contact - Anna&apos;s Artistic Journey</title>
        <meta
          name='description'
          content='Get in touch with Anna for inquiries, commissions, or feedback.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto'>
        <h1 className='text-4xl font-bold mb-6'>Contact</h1>

        <form
          id='contact'
          onSubmit={handleSubmit}
          className='grid grid-cols-1 gap-6'
        >
          <label className='block'>
            <span className='text-gray-700'>Full name</span>
            <input
              type='text'
              id='name'
              name='name'
              className='mt-3 w-full input input-bordered'
              placeholder='John Doe'
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor='email' className='block'>
            <span className='text-gray-700'>Email address</span>
            <input
              id='email'
              type='email'
              name='email'
              className='mt-3 w-full input input-bordered'
              placeholder='example@something.something'
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor='message' className='block'>
            <span className='text-gray-700'>Message</span>
            <textarea
              id='message'
              name='message'
              className='textarea textarea-bordered mt-3 w-full'
              rows={3}
              placeholder='Your message'
              onChange={handleChange}
              required
            ></textarea>
          </label>

          <div className='flex items-center gap-2'>
            <FormSubmitButton
              disabled={success}
              form='contact'
              className='btn-block'
            >
              Send
            </FormSubmitButton>
            {isPending && (
              <span className='loading loading-spinner loading-md' />
            )}
            {!isPending && success && (
              <span className='text-success'>Sent.</span>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
