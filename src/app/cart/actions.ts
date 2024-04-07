'use server';

import { ShoppingCart, createCart, getCart } from '@/lib/db/cart';
import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/configs/auth/authOptions';
import { env } from '@/lib/env';
import { formatPrice } from '@/lib/format';

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());
  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: { id: articleInCart.id },
          },
        },
      });
    }
  } else {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: { id: articleInCart.id },
              data: { quantity },
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
              quantity,
            },
          },
        },
      });
    }
  }

  revalidatePath('/cart');
}

export async function sendEmail(cart: ShoppingCart) {
  const session = await getServerSession(authOptions);
  // Format the order details into a message
  const message = `New order received ${cart.id}:\n\n${cart.items
    .map(
      (item) =>
        `Item ID: ${item.id}\nItem Name: ${item.product.name}\nQuantity: ${item.quantity}\nPrice: ${formatPrice(item.product.price)}\n\n`,
    )
    .join(
      '',
    )}\n\nTotal: ${cart.subtotal}\n\nEmail: ${session?.user.email}\n\nName: ${session?.user.name}.`;
  try {
    await fetch(`${env.NEXTAUTH_URL}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  } catch (error) {
    console.error('Error sending email:', error);
  }

  revalidatePath('/cart');
}

export async function deleteCart(cartId: string) {
  await prisma.cart.delete({
    where: { id: cartId },
  });
  revalidatePath('/cart');
}
