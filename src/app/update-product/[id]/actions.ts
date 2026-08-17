'use server';

import { getServerSession } from 'next-auth';
import authOptions from '@/lib/configs/auth/authOptions';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { isAdmin } from '@/lib/utils';

export async function updateProduct(formData: FormData) {
  'use server';
  const session = await getServerSession(authOptions);

  if (!isAdmin(session)) {
    throw Error('You are not admin ಠ_ಠ');
  }

  const productId = formData.get('productId')?.toString();
  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  const price = Number(formData.get('price') || 0);
  const availability = formData.get('availability')?.toString();

  if (!name || !description || !imageUrl || !price || !availability) {
    throw Error('Missing required fields.');
  }
  await prisma.product.update({
    where: { id: productId },
    data: {
      name,
      description,
      imageUrl,
      price,
      availability: availability as any,
    },
  });

  redirect('/');
}
