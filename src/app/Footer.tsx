import Link from 'next/link';

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
      </div>
    </footer>
  );
}
