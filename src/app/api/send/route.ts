import { env } from '@/lib/env';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { APP_NAME } from '../../../../constants';

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { subject, message } = body;
  try {
    const data = await resend.emails.send({
      from: `${APP_NAME} <sales@an-artist.store>`,
      to: [env.ADMIN, env.SUPER_ADMIN],
      subject: subject,
      text: message,
    });
    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
