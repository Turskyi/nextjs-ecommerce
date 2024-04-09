'use server';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/configs/auth/authOptions';
import { prisma } from '@/lib/db/prisma';

export async function addProduct(formData: FormData) {
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
