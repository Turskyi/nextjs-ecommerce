import authOptions from '@/lib/configs/auth/authOptions';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { APP_NAME } from '../../../../constants';
import UpdateForm from './UpdateForm';
import { isAdmin } from '@/lib/utils';

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
  
  if (!isAdmin(session)) {
    throw Error('You are not admin ಠ_ಠ');
  }

  const product = await getProduct(id);

  return (
    <div>
      <h1 className='text-lg mb-3 font-bold'>Update Product</h1>
      <UpdateForm product={product} />
    </div>
  );
}
