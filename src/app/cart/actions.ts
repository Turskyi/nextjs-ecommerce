'use server';

import { ShoppingCart, createCart, getCart } from '@/lib/db/cart';
import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { env } from '@/lib/env';
import { formatPrice } from '@/lib/format';
import { APP_NAME } from '../../../constants';

export async function setProductQuantity(productId: string, quantity: number) {
  const targetQuantity = quantity > 0 ? 1 : 0;

  if (targetQuantity > 0) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product || product.availability !== 'AVAILABLE') {
      throw new Error('Product is no longer available.');
    }
  }

  const cart = (await getCart()) ?? (await createCart());
  const existingItem = cart.items.find((item) => item.productId === productId);

  if (targetQuantity === 0) {
    if (existingItem) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: { id: existingItem.id },
          },
        },
      });
    }
  } else {
    if (existingItem) {
      // If already in cart, ensure quantity is 1
      if (existingItem.quantity !== 1) {
        await prisma.cart.update({
          where: { id: cart.id },
          data: {
            items: {
              update: {
                where: { id: existingItem.id },
                data: { quantity: 1 },
              },
            },
          },
        });
      }
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
  orderId?: string,
) {
  const email = contactInfo.email;
  const subject = `New Order Received from ${APP_NAME}`;
  // Format the order details into a message
  const message = `Order ${orderId || cart.id}:\n\n${cart.items
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
