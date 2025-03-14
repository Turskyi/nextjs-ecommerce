import { env } from '@/lib/env';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { APP_NAME, RESEND_DOMAIN } from '../../../../constants';

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, subject, message } = body;
  // Get current date and time.
  const currentDateTime = new Date().toLocaleString();
  try {
    const data = await resend.emails.send({
      from: `Do Not Reply ${APP_NAME} <test@${RESEND_DOMAIN}>`,
      to: [env.SUPER_ADMIN],
      subject: `Test: ${subject}`,
      text: `Test.\n\n${message}\n\nEmail: ${email}\n\n
      Date and Time: ${currentDateTime}`,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
