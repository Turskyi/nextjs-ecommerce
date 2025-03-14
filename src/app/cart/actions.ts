'use server';

import { ShoppingCart, createCart, getCart } from '@/lib/db/cart';
import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { env } from '@/lib/env';
import { formatPrice } from '@/lib/format';
import { APP_NAME } from '../../../constants';

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

export interface ContactInfo {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export async function sendOrderEmail(
  cart: ShoppingCart,
  contactInfo: ContactInfo,
) {
  const email = contactInfo.email;
  const subject = `New Order Received from ${APP_NAME}`;
  // Format the order details into a message
  const message = `Order ${cart.id}:\n\n${cart.items
    .map(
      (item) =>
        `Cart Item ID: ${item.id}\nProduct Name: ${item.product.name}\n
      Quantity: ${item.quantity}\n
      Price: ${formatPrice(item.product.price)}\n\n`,
    )
    .join('')}\n\nTotal: ${formatPrice(cart.subtotal)}\n\n
    User Email: ${contactInfo.email}\n\n
    User Name: ${contactInfo.firstName} ${contactInfo.lastName}\n\n
    User Phone: ${contactInfo.phoneNumber}\n\n
    User Street: ${contactInfo.street}\n\n
    User City: ${contactInfo.city}\n\n
    User Postal code: ${contactInfo.postalCode}\n\n
    User Country: ${contactInfo.country}.`;
  try {
    await fetch(`${env.NEXTAUTH_URL}/api/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, subject, message }),
    })
      .then((response) => response.json())
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
