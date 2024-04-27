import { env } from '@/lib/env';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { APP_NAME } from '../../../../constants';

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, subject, message } = body;
  try {
    const data = await resend.emails.send({
      from: `${APP_NAME} <no-reply@an-artist.store>`,
      to: [env.ADMIN, env.SUPER_ADMIN],
      subject: subject,
      text: message,
    });
    await resend.emails.send({
      from: `${APP_NAME} <no-reply@an-artist.store>`,
      to: [email],
      subject: `Order Details: ${APP_NAME}`,
      text: `Thank you for your order! Someone from our store will contact you shortly to discuss payment and delivery options.\n\n${message}`,
    });
    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
