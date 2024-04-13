import Link from 'next/link';
import { FLICKR, INSTAGRAM } from '../../constants';

export default function Footer() {
  return (
    <footer className='bg-neutral p-10 text-neutral-content'>
      <div className='footer m-auto max-w-7xl'>
        <div>
          <span className='footer-title'>Services</span>
          <Link href='/search?query=accessories' className='link-hover link'>
            Accessories
          </Link>
          <Link href='/search?query=clothing' className='link-hover link'>
            Clothing
          </Link>
          <Link href='/search?query=dolls' className='link-hover link'>
            Dolls
          </Link>
          <Link href='/search?query=art' className='link-hover link'>
            Art
          </Link>
        </div>
        <div>
          <span className='footer-title'>Company</span>
          <Link href='/about-us' className='link-hover link'>
            About us
          </Link>
          <Link href='/contact' className='link-hover link'>
            Contact
          </Link>
          <Link href='/press-kit' className='link-hover link'>
            Press kit
          </Link>
        </div>
        <div>
          <span className='footer-title'>Legal</span>
          <Link href='/terms-of-use' className='link-hover link'>
            Terms of use
          </Link>
          <Link href='/privacy-policy' className='link-hover link'>
            Privacy policy
          </Link>
          <Link href='/cookie-policy' className='link-hover link'>
            Cookie policy
          </Link>
        </div>
        <div>
          <span className='footer-title'>Follow Us</span>
          <Link href={INSTAGRAM}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='h-8 w-8'
            >
              <rect x='2' y='2' width='20' height='20' rx='5' ry='5'></rect>
              <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path>
              <line x1='17.5' y1='6.5' x2='17.5' y2='6.5'></line>
            </svg>
          </Link>
          <Link href={FLICKR}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='0.01'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='h-8 w-8'
            >
              <circle cx='7' cy='12' r='4' fill='#0063dc'></circle>
              <circle cx='17' cy='12' r='4' fill='#ff0084'></circle>
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
