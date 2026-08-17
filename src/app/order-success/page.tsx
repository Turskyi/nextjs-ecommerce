import Script from 'next/script';
import Link from 'next/link';

interface OrderSuccessPageProps {
  searchParams: {
    orderId?: string;
    email?: string;
    country?: string;
  };
}

export default function OrderSuccessPage({
  searchParams,
}: OrderSuccessPageProps) {
  const { orderId, email, country } = searchParams;

  // Calculate estimated delivery date (e.g., 7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const estimatedDeliveryDate = deliveryDate.toISOString().split('T')[0];

  if (!orderId || !email || !country) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[50vh]'>
        <h1 className='text-2xl font-bold mb-4'>Order Completed</h1>
        <p className='mb-6'>Thank you for your purchase!</p>
        <Link href='/' className='btn btn-primary'>
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-[50vh]'>
      <h1 className='text-2xl font-bold mb-4'>Order Submitted!</h1>
      <p className='mb-2 text-center'>
        Thank you for your order, {email}.
        <br />
        Anna will contact you shortly to arrange payment and delivery.
      </p>
      <p className='mb-6'>Order ID: {orderId}</p>

      <Link href='/' className='btn btn-primary'>
        Continue Shopping
      </Link>

      {/* Google Customer Reviews Opt-in */}
      <Script
        id='google-customer-reviews-setup'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.renderOptIn = function() {
              window.gapi.load('surveyoptin', function() {
                window.gapi.surveyoptin.render({
                  "merchant_id": 5496025545,
                  "order_id": "${orderId}",
                  "email": "${email}",
                  "delivery_country": "${country}",
                  "estimated_delivery_date": "${estimatedDeliveryDate}"
                });
              });
            }
          `,
        }}
      />
      <Script
        src='https://apis.google.com/js/platform.js?onload=renderOptIn'
        strategy='afterInteractive'
      />
    </div>
  );
}
