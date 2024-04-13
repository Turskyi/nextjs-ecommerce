import Head from 'next/head';
import { DOMAIN } from '../../../constants';

export default function PrivacyPolicy() {
  return (
    <div className='bg-body background-color text-body color p-5'>
      <Head>
        <title>Privacy Policy - Anna&apos;s Artistic Store</title>
        <meta
          name='description'
          content="Privacy Policy for Anna's Artistic Store."
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto'>
        <h1 className='text-4xl font-bold mb-6'>
          Anna&apos;s Artistic Store Privacy Policy
        </h1>

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>Introduction</h2>
          <p className='text-lg mb-4'>
            We respect the privacy of our website visitors and are committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, and share information about you when you visit
            or make a purchase from {DOMAIN}.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>Information We Collect</h2>
          <p className='text-lg mb-4'>
            We collect information that you provide to us directly, such as when
            you create an account, make a purchase, or sign up for our
            newsletter. This information may include your name, email address,
            shipping address, payment information, and any other details you
            choose to provide.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>
            How We Use Your Information
          </h2>
          <p className='text-lg mb-4'>
            We use the information we collect to fulfill orders, communicate
            with you about our products and services, and improve our
            website&apos;s functionality. We may also use your information for
            marketing purposes, such as sending you promotional emails or
            advertising on social media platforms.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>Sharing Your Information</h2>
          <p className='text-lg mb-4'>
            We do not sell or rent your personal information to third parties.
            However, we may share your information with service providers who
            assist us in operating our website, conducting our business, or
            serving our users, so long as those parties agree to keep this
            information confidential.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>Your Rights</h2>
          <p className='text-lg mb-4'>
            You have the right to access, correct, or delete your personal
            information that we hold. You can also object to the processing of
            your personal information, ask us to restrict the processing of your
            personal information, or request portability of your personal
            information.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>
            Cookies and Tracking Technologies
          </h2>
          <p className='text-lg mb-4'>
            We use cookies and similar tracking technologies to track activity
            on our website and hold certain information. Cookies are files with
            a small amount of data which may include an anonymous unique
            identifier.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>Contact Us</h2>
          <p className='text-lg mb-4'>
            If you have any questions about this Privacy Policy, please contact
            us using the information in our Contact section.
          </p>
        </section>
      </main>
    </div>
  );
}
