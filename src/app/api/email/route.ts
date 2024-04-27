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
      from: `${APP_NAME} <test@an-artist.store>`,
      to: [env.SUPER_ADMIN],
      subject: `Test: ${subject}`,
      text: `Test.\n\n${message}\n\nEmail: ${email}`,
    });

    return Response.json(data);
  } catch (error) {
    console.log('DEb: error' + error);
    return Response.json({ error });
  }
}
