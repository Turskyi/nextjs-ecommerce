import { cookies } from 'next/dist/client/components/headers';
import { prisma } from './prisma';
import { Cart, Prisma } from '@prisma/client';

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const localCardId = cookies().get('localCardId')?.value;
  const cart = localCardId
    ? await prisma.cart.findUnique({
        where: { id: localCardId },
        include: { items: { include: { product: true } } },
      })
    : null;

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.items.reduce(
      (accumulatedValue, item) => accumulatedValue + item.quantity,
      // Starting value.
      0,
    ),
    subtotal: cart.items.reduce(
      (accumulatedValue, item) =>
        accumulatedValue + item.quantity * item.product.price,
      // Starting value.
      0,
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });

  // TODO: Needs encryption + secure settings in real production app.
  cookies().set('localCardId', newCart.id);
  return {
    ...newCart,
    // New cart is empty.
    items: [],
    size: 0,
    subtotal: 0,
  };
}
