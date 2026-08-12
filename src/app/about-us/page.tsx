import Head from 'next/head';
import Link from 'next/link';
import { INSTAGRAM } from '../../../constants';

export default function AboutUs() {
  return (
    <div className='bg-body background-color text-body color p-5'>
      <Head>
        <title>About Us - Anna&apos;s Artistic Journey</title>
        <meta
          name='description'
          content='Learn more about Anna, her artistic journey, and the story behind her creations.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto'>
        <h1 className='text-4xl font-bold mb-6'>About Us</h1>

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>Our Story</h2>
          <p className='text-lg mb-4'>
            Anna has always been an artistic soul, from sketching as a child to
            finding her unique style in urban fashion as a teenager. Her passion
            for creativity extends to her work as a photo-model, where she
            embraces every opportunity to stand in front of the camera.
          </p>
          <p className='text-lg mb-4'>
            Self-taught in Photoshop and with a circle of friends in rock
            climbing and mono-wheel communities, Anna has designed popular, functional
            bags for their equipment. Her time at a kids&apos; accessories
            atelier sparked her distinctive approach to creating soft dolls—each
            piece a reflection of her complex personality, even if a little
            eerie at times.
          </p>
          <p className='text-lg mb-4'>
            Anna&apos;s resilience shines through her life&apos;s challenges,
            including standing up for her dignity at work and valuing her
            personal time. She is a multifaceted individual, balancing her
            artistic pursuits with her role as a dental hygienist to support her
            life in Zielona Góra—a city she resides in but not without longing
            for change.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>Our Art</h2>
          <p className='text-lg mb-4'>
            Anna&apos;s art is a vibrant tapestry of life&apos;s colors, woven
            from the threads of her diverse experiences. Her current focus is on
            paintings, from the kaleidoscopic portrait of a cat to the serene
            beauty captured on maple leaves, inviting onlookers into a world where
            every hue sings and every line tells a story.
          </p>
          <p className='text-lg mb-4'>
            Her artistic journey has been diverse, encompassing the creation of
            intricate soft dolls and functional equipment for adventurers.
            However, her true passion and current professional focus lies in
            expressing herself through the canvas.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>Our Mission</h2>
          <p className='text-lg mb-4'>
            At the heart of Anna&apos;s work lies a mission to create a
            sanctuary of imagination for those who seek refuge from the mundane.
            Her art is not just an escape but a gateway to introspection and a
            canvas for the soul&apos;s deepest musings. In a world that often
            demands conformity, Anna&apos;s creations are a rebellion—a
            declaration of the freedom to be different, to feel deeply, and to
            live boldly.
          </p>
          <p className='text-lg mb-4'>
            While her journey has taken her from the familiar streets of
            Zaporizhzhia to the uncertain paths of Zielona Góra, her art remains
            a steadfast companion, a source of solace and strength. It is her
            hope that through her creations, others may find the same comfort
            and inspiration that has guided her through life&apos;s many turns.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>Contact Us</h2>
          <p className='text-lg'>
            For inquiries, please reach out to Anna via Instagram:&nbsp;
            <Link
              className='text-accent hover:underline'
              target='_blank'
              rel='noopener noreferrer'
              href={INSTAGRAM}
            >
              @anartistdoll
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
