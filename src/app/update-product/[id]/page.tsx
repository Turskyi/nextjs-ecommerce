import FormSubmitButton from '@/components/FormSubmitButton';
import authOptions from '@/lib/configs/auth/authOptions';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { APP_NAME } from '../../../../constants';

interface UpdateProductPageProps {
  params: {
    id: string;
  };
}

export const metadata = {
  title: `Update Product - ${APP_NAME}`,
};

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

async function updateProduct(formData: FormData) {
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

  const productId = formData.get('productId')?.toString();
  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  const price = Number(formData.get('price') || 0);
  if (!name || !description || !imageUrl || !price) {
    throw Error('Missing required fields.');
  }
  await prisma.product.update({
    where: { id: productId },
    data: { name, description, imageUrl, price },
  });

  redirect('/');
}

export default async function UpdateProductPage({
  params: { id },
}: UpdateProductPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    // For the callback path, it’s recommended to use “signin” (without a
    // hyphen) to maintain consistency with NextAuth.js conventions. This
    // aligns with the default behavior of NextAuth.js, which expects HTTP POST
    // requests for authentication actions.
    redirect('/api/auth/signin?callbackUrl=/update-product/' + id);
  }
  const product = await getProduct(id);

  return (
    <div>
      <h1 className='text-lg mb-3 font-bold'>Update Product</h1>
      <form action={updateProduct}>
        {/* Hidden input field for product ID */}
        <input type='hidden' name='productId' value={product.id} />
        <input
          required
          name='name'
          placeholder='Name'
          defaultValue={product.name}
          //   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          defaultValue={product.imageUrl}
          className='mb-3 w-full input input-bordered'
        />
        <input
          required
          name='price'
          placeholder='Price'
          type='number'
          defaultValue={product.price}
          className='mb-3 w-full input input-bordered'
        />
        <FormSubmitButton className='btn-block'>
          Update Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
