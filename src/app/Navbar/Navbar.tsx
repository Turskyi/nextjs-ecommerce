import Link from 'next/link';
import Image from 'next/image';
import logoWithoutBg from '@/assets/logo_without_bg.png';
import { redirect } from 'next/navigation';
import { getCart } from '@/lib/db/cart';
import ShoppingCartButton from './ShoppingCartButton';
import UserMenuButton from './UserMenuButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/configs/auth/authOptions';
import { Button } from '@/components/ui/button';
import { isAdmin } from '@/lib/utils';
import { APP_NAME } from '../../../constants';

async function searchProducts(formData: FormData) {
  'use server';

  const searchQuery = formData.get('searchQuery')?.toString();

  if (searchQuery) {
    redirect('/search?query=' + searchQuery);
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();
  return (
    <div className='bg-base-100'>
      <div className='navbar max-w-7xl m-auto flex-col sm:flex-row gap-2'>
        <div className='flex-1'>
          <Link href='/' className='btn btn-ghost text-xl normal-case'>
            <Image
              src={logoWithoutBg}
              height={40}
              width={40}
              alt={`${APP_NAME} logo`}
            />
            {APP_NAME}
          </Link>
        </div>
        <div className='flex-none gap-2'>
          <form action={searchProducts}>
            <div className='form-control'>
              <input
                name='searchQuery'
                placeholder='Search'
                className='input input-bordered w-full min-w-[100px]'
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />

          {isAdmin(session) && (
            <Button asChild>
              <Link href='/add-product'>Post a product</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
