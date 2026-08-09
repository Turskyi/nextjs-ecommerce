'use server';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/configs/auth/authOptions';
import { prisma } from '@/lib/db/prisma';
import { isAdmin, toSlug } from '@/lib/utils';
import { put } from '@vercel/blob';
import { env } from '@/lib/env';
import { nanoid } from 'nanoid';
import path from 'path';

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

  if (!isAdmin(session)) {
    throw Error('You are not admin ಠ_ಠ');
  }

  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  let imageUrl = formData.get('imageUrl')?.toString();
  const price = Number(formData.get('price') || 0);
  const productImage = formData.get('productImage') as File;

  if (!name || !description || !price) {
    throw Error('Missing required fields.');
  }

  if (!imageUrl && productImage && productImage.size > 0) {
    const slug = `${toSlug(name)}-${nanoid(10)}`;
    const filename = `product_images/${slug}${path.extname(productImage.name)}`;
    const blob = await put(filename, productImage, {
      access: 'public',
      addRandomSuffix: false,
      token: env.BLOB_READ_WRITE_TOKEN,
    });
    imageUrl = blob.url;
  }

  if (!imageUrl) {
    throw Error('Image URL or uploaded image is required.');
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect('/');
}
