import Head from 'next/head';

export default function ReturnPolicy() {
  return (
    <div className="bg-body background-color text-body color p-5">
      <Head>
        <title>Return Policy - Anna&apos;s Artistic Store</title>
        <meta
          name="description"
          content="Return Policy for Anna's Artistic Store."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Anna&apos;s Artistic Store Return Policy
        </h1>

        <section className="mb-6">
          <h2 className="text-3xl font-bold mb-4">Introduction</h2>
          <p className="text-lg mb-4">
            At Anna&apos;s Artistic Store, we take great pride in the quality and
            craftsmanship of our handmade art and paintings. If you are not
            entirely satisfied with your purchase, we&apos;re here to help.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-3xl font-bold mb-4">Returns</h2>
          <p className="text-lg mb-4">
            You have 30 calendar days to return an item from the date you
            received it. To be eligible for a return, your item must be unused
            and in the same condition that you received it. Your item must be
            in the original packaging. Your item needs to have the receipt or
            proof of purchase.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-3xl font-bold mb-4">Refunds</h2>
          <p className="text-lg mb-4">
            Once we receive your item, we will inspect it and notify you that we
            have received your returned item. We will immediately notify you on
            the status of your refund after inspecting the item. If your return
            is approved, we will initiate a refund to your original method of
            payment. You will receive the credit within a certain amount of
            days, depending on your card issuer&apos;s policies.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-3xl font-bold mb-4">Shipping</h2>
          <p className="text-lg mb-4">
            You will be responsible for paying for your own shipping costs for
            returning your item. Shipping costs are non-refundable. If you
            receive a refund, the cost of return shipping will be deducted from
            your refund.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-3xl font-bold mb-4">Damaged Items</h2>
          <p className="text-lg mb-4">
            If you received a damaged product, please notify us immediately for
            assistance.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg mb-4">
            If you have any questions on how to return your item to us, please
            contact us through our Contact section.
          </p>
        </section>
      </main>
    </div>
  );
}
