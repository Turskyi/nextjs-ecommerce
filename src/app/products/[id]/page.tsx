import { prisma } from '@/lib/db/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import PriceTag from '@/components/PriceTag';
import { Metadata } from 'next';
import { cache } from 'react';
import AddToCartButton from './AddToCartButton';
import {
  incrementProductQuantity,
  deleteProduct,
  updateProduct,
} from './actions';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/configs/auth/authOptions';
import { isAdmin } from '@/lib/utils';
import UpdateProductButton from './UpdateProductButton';
import DeleteProductButton from './DeleteProductButton';
import { APP_NAME } from '../../../../constants';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product.name + ' - ' + APP_NAME,
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);
  const session = await getServerSession(authOptions);
  return (
    <div className='flex flex-col lg:flex-row gap-4 lg:items-center'>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className='rounded-lg'
        priority
      />
      <div>
        <h1 className='text-5xl font-bold'>{product.name}</h1>
        <PriceTag price={product.price} className='mt-4' />
        <p className='py-6'>{product.description}</p>
        {isAdmin(session) ? (
          <>
            <UpdateProductButton
              productId={product.id}
              updateProduct={updateProduct}
            />
            <DeleteProductButton
              productId={product.id}
              deleteProduct={deleteProduct}
            />
          </>
        ) : (
          <AddToCartButton
            productId={product.id}
            incrementProductQuantity={incrementProductQuantity}
          />
        )}
      </div>
    </div>
  );
}
