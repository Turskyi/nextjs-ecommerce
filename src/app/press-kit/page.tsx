import { INSTAGRAM } from '../../../constants';

export default function PressKit() {
  return (
    <div className='bg-body background-color text-body color p-5'>
      <div className='container mx-auto'>
        <h1 className='text-4xl font-bold mb-6'>Press Kit</h1>
        <p className='text-lg mb-4'>
          Welcome to the official press kit page for Anna, a multifaceted artist
          creating unique and inspiring art pieces. Here you&apos;ll find
          everything you need to feature Anna&apos;s work in your publication.
        </p>
        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>Anna&apos;s Biography</h2>
          <p className='text-lg mb-4'>
            Anna was born on August 12, 1993, in Zaporizhzhia, Ukraine. From a
            young age, she was surrounded by the industrious spirit of her
            father, who worked diligently at the local factory, and the
            nurturing presence of her mother, who managed the household despite
            her disability.
          </p>
          <p className='text-lg mb-4'>
            Her creative journey began at Khortytsia National Academy on
            Khortytsia Island, where she pursued higher education in clothes
            design. It was here that Anna honed her skills and developed a deep
            understanding of the artistry involved in fashion.
          </p>
          <p className='text-lg mb-4'>
            Despite her qualifications, Anna found it challenging to find a
            place in Ukraine that embraced her unique vision. This led her to
            seek opportunities abroad, eventually leading her to the vibrant
            city of Zielona Góra in Poland&apos;s Lubusz Province.
          </p>
          <p className='text-lg mb-4'>
            In Zielona Góra, Anna discovered a community that celebrated her
            talents, allowing her to flourish as an artist. She has since been
            creating beautiful clothes, dolls, bags, and paintings, all while
            continuing to explore her vast potential.
          </p>
        </section>

        {/* Other sections will go here */}

        <section className='mb-6'>
          <h2 className='text-3xl font-bold mb-4'>Contact Information</h2>
          <p className='text-lg'>
            For press inquiries, please contact Anna via Instagram:&nbsp;
            <a
              href={INSTAGRAM}
              className='text-accent hover:underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              @anartistdoll
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
