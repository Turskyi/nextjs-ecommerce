import Head from 'next/head';

export default function CookiePolicy() {
  return (
    <div className='bg-body background-color text-body color p-5'>
      <Head>
        <title>Cookie Policy - Anna&apos;s Artistic Store</title>
        <meta
          name='description'
          content="Cookie Policy for Anna's Artistic Store."
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto'>
        <h1 className='text-4xl font-bold mb-6'>Cookie Policy</h1>

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>What Are Cookies</h2>
          <p className='text-lg mb-4'>
            Cookies are small text files that are placed on your computer or
            mobile device when you visit a website. They are widely used to make
            websites work, or work more efficiently, as well as to provide
            information to the owners of the site.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>How We Use Cookies</h2>
          <p className='text-lg mb-4'>
            We use cookies to enhance your browsing experience by:
          </p>
          <ul className='list-disc pl-6 mb-4'>
            <li>Remembering your preferences and settings.</li>
            <li>Enabling shopping cart functionality.</li>
            <li>Providing analytics to improve our website and services.</li>
          </ul>
        </section>

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>Disabling Cookies</h2>
          <p className='text-lg mb-4'>
            You can prevent the setting of cookies by adjusting the settings on
            your browser. Be aware that disabling cookies may affect the
            functionality of this and many other websites that you visit.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>More Information</h2>
          <p className='text-lg mb-4'>
            If you would like more information about how we use cookies, please
            contact us using the information in our Contact section.
          </p>
        </section>
      </main>
    </div>
  );
}
