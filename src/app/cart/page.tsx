import { getCart } from '@/lib/db/cart';
import CartEntry from './CartEntry';
import { setProductQuantity, sendEmail, deleteCart } from './actions';
import { formatPrice } from '@/lib/format';
import CheckoutButton from './CheckoutButton';
import { APP_NAME } from '../../../constants';
import { redirect } from 'next/navigation';

export const metadata = {
  title: `Your Cart - ${APP_NAME}`,
};
async function submitOrder(formData: FormData) {
  'use server';

  const email = formData.get('email')?.toString();
  const firstName = formData.get('firstName')?.toString();
  const lastName = formData.get('lastName')?.toString();
  const phoneNumber = formData.get('phoneNumber')?.toString();
  const street = formData.get('street')?.toString();
  const city = formData.get('city')?.toString();
  const postalCode = formData.get('postalCode')?.toString();
  const country = formData.get('country')?.toString();

  if (
    !email ||
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !street ||
    !city ||
    !postalCode ||
    !country
  ) {
    throw Error('Missing required fields.');
  }
  const cart = await getCart();
  if (!cart) {
    throw new Error('Cart is empty');
  }
  await sendEmail(cart, {
    email,
    firstName,
    lastName,
    phoneNumber,
    street,
    city,
    postalCode,
    country,
  });
  await deleteCart(cart.id);

  redirect('/');
}
export default async function CartPage() {
  const cart = await getCart();

  return (
    <div>
      <div className='flex flex-row'>
        <div className='w-3/4'>
          {/* Cart Items */}
          <h1 className='mb-6 text-3xl font-bold'>Shopping Cart</h1>
          {cart?.items.map((cartItem) => (
            <CartEntry
              cartItem={cartItem}
              key={cartItem.id}
              setProductQuantity={setProductQuantity}
            />
          ))}
          {!cart?.items.length && <p>Your cart is empty.</p>}
        </div>
        {/* Vertical devider */}
        <div className='w-min'>
          <div
            className='w-4/5 ml-4 border-divider'
            style={{
              borderLeft: '1px solid #ddd',
              height: '100%',
              margin: '0 1rem',
            }}
          ></div>
        </div>
        <div className='w-1/4 ml-4'>
          {/* Contact Information */}
          <h2 className='mb-4 text-xl font-bold'>Delivery Information</h2>
          <form id='order' action={submitOrder}>
            <div className='mb-2'>
              <label htmlFor='email' className='block mb-2 text-sm font-medium'>
                Email
              </label>
              <input
                required
                type='email'
                id='email'
                name='email'
                placeholder='example@something.something'
                className='mb-3 w-full input input-bordered'
              />
            </div>
            <div className='mb-2'>
              <label
                htmlFor='firstName'
                className='block mb-2 text-sm font-medium'
              >
                First Name
              </label>
              <input
                required
                type='text'
                id='firstName'
                name='firstName'
                placeholder='Name'
                className='mb-3 w-full input input-bordered'
              />
            </div>
            <div className='mb-2'>
              <label
                htmlFor='lastName'
                className='block mb-2 text-sm font-medium'
              >
                Last Name
              </label>
              <input
                required
                type='text'
                id='lastName'
                name='lastName'
                placeholder='Surname'
                className='mb-3 w-full input input-bordered'
              />
            </div>
            <div className='mb-2'>
              <label
                htmlFor='phoneNumber'
                className='block mb-2 text-sm font-medium'
              >
                Phone Number
              </label>
              <input
                required
                type='tel'
                id='phoneNumber'
                name='phoneNumber'
                className='mb-3 w-full input input-bordered'
              />
            </div>
            <div className='mb-2'>
              <label
                htmlFor='street'
                className='block mb-2 text-sm font-medium'
              >
                Street Address
              </label>
              <input
                type='text'
                id='street'
                name='street'
                className='textarea textarea-bordered mb-3 w-full'
                required
              />
            </div>
            <div className='mb-2'>
              <label htmlFor='city' className='block mb-2 text-sm font-medium'>
                City
              </label>
              <input
                type='text'
                id='city'
                name='city'
                className='mb-3 w-full input input-bordered'
                required
              />
            </div>
            <div className='mb-2'>
              <label
                htmlFor='postalCode'
                className='block mb-2 text-sm font-medium'
              >
                Postal Code
              </label>
              <input
                type='text'
                id='postalCode'
                name='postalCode'
                className='mb-3 w-full input input-bordered'
                required
              />
            </div>
            <div className='mb-2'>
              <label
                htmlFor='country'
                className='block mb-2 text-sm font-medium'
              >
                Country
              </label>
              <input
                type='text'
                id='country'
                name='country'
                className='mb-3 w-full input input-bordered'
                required
              />
            </div>
          </form>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center mt-4'>
        {/* Total and Checkout Button */}
        <p className='mb-3 font-bold'>
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <CheckoutButton />
      </div>
    </div>
  );
}
