'use server';

import { env } from '@/lib/env';
import { redirect } from 'next/navigation';
import { APP_NAME } from '../../../constants';

export interface ContactEmail {
  email: string;
  name: string;
  message: string;
}

export async function sendContactEmail(contactEmail: ContactEmail) {
  const email = contactEmail.email;
  const subject = `New Message Received from ${APP_NAME}`;
  // Format the order details into a message
  const message = `New contact message received:\n\n
  Email: ${contactEmail.email}\n\nName: ${contactEmail.name}\n\n
  Message: ${contactEmail.message}.`;
  try {
    await fetch(`${env.NEXTAUTH_URL}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, subject, message }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  } catch (error) {
    console.error('Error sending email:', error);
  }

  redirect('/');
}
