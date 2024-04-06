import FormSubmitButton from '@/components/FormSubmitButton';
import authOptions from '@/lib/configs/auth/authOptions';
import { prisma } from '@/lib/db/prisma';
import { env } from '@/lib/env';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Add Product - AnArtistArt',
};

async function addProduct(formData: FormData) {
  'use server';
  const session = await getServerSession(authOptions);
  if (!session) {
    // TODO: also check if the user is admin.

    // For the callback path, it’s recommended to use “signin” (without a
    // hyphen) to maintain consistency with NextAuth.js conventions. This
    // aligns with the default behavior of NextAuth.js, which expects HTTP POST
    // requests for authentication actions.
    redirect('/api/auth/signin?callbackUrl=/add-product');
  }

  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  const price = Number(formData.get('price') || 0);
  if (!name || !description || !imageUrl || !price) {
    throw Error('Missing required fields.');
  }
  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect('/');
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    // For the callback path, it’s recommended to use “signin” (without a
    // hyphen) to maintain consistency with NextAuth.js conventions. This
    // aligns with the default behavior of NextAuth.js, which expects HTTP POST
    // requests for authentication actions.
    redirect('/api/auth/signin?callbackUrl=/add-product');
  }

  if (!session.user.isAdmin) {
    return <div>Please login as an admin.</div>;
  }

  return (
    <div>
      <h1 className='text-lg mb-3 font-bold'>Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name='name'
          placeholder='Name'
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
          className='mb-3 w-full input input-bordered'
        />
        <input
          required
          name='price'
          placeholder='Price'
          type='number'
          className='mb-3 w-full input input-bordered'
        />
        <FormSubmitButton className='btn-block'>Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
