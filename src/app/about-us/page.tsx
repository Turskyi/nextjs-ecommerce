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
            for creativity extends to her work as a photomodel, where she
            embraces every opportunity to stand in front of the camera.
          </p>
          <p className='text-lg mb-4'>
            Self-taught in Photoshop and with a circle of friends in rock
            climbing and monowheel communities, Anna designs popular, functional
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
            from the threads of her diverse experiences. Her soft dolls, a
            signature creation, are a testament to her unique vision—each piece
            a narrative, sometimes whimsical, sometimes contemplative, but
            always deeply personal. Her bags are not just carriers but
            companions for adventurers and everyday heroes, crafted with care
            for climbers and urban explorers alike. The paintings, from the
            kaleidoscopic portrait of a cat to the serene beauty captured on
            maple leaves, invite onlookers into a world where every hue sings
            and every line tells a story.
          </p>
          <p className='text-lg mb-4'>
            Her clothing designs mirror her philosophy of life—comfort without
            compromising style, functionality fused with flair. Each piece is a
            celebration of individuality and a bold statement of
            self-expression.
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
