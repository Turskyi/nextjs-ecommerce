'use server';

import { createCart, getCart } from '@/lib/db/cart';
import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/configs/auth/authOptions';
import { isAdmin } from '@/lib/utils';
import { redirect } from 'next/navigation';

export async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (articleInCart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          update: {
            where: { id: articleInCart.id },
            data: { quantity: { increment: 1 } },
          },
        },
      },
    });
  } else {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          create: {
            productId,
            quantity: 1,
          },
        },
      },
    });
  }
  revalidatePath('/products/[id]');
}

export async function deleteProduct(productId: string) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!isAdmin(session)) {
      throw new Error('Not authorized');
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    revalidatePath('/');
  } catch (error) {
    let message = 'Unexpected error';
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }

  redirect('/');
}

export async function updateProduct(productId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!isAdmin(session)) {
      throw new Error('Not authorized');
    }

    revalidatePath('/update-product/[id]');
  } catch (error) {
    let message = 'Unexpected error';
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }

  redirect('/update-product/' + productId);
}
