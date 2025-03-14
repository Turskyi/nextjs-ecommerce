import { env } from '@/lib/env';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { APP_NAME, RESEND_DOMAIN } from '../../../../constants';

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, subject, message } = body;
  try {
    const data = await resend.emails.send({
      from: `Do Not Reply ${APP_NAME} <no-reply@${RESEND_DOMAIN}>`,
      to: [env.ADMIN, env.SUPER_ADMIN],
      subject: subject,
      text: message,
    });
    await resend.emails.send({
      from: `Do Not Reply ${APP_NAME} <no-reply@${RESEND_DOMAIN}>`,
      to: [email],
      subject: `Order Details: ${APP_NAME}`,
      text: `Thank you for your order! Someone from ${APP_NAME} will contact you 
      shortly to discuss payment and delivery options.\n\n${message}`,
    });
    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
