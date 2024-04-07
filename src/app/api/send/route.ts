import { env } from '@/lib/env';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { message } = body;
  try {
    const data = await resend.emails.send({
      //TODO: replace with production emails
      from: 'AnArtistStore <dmytro@an-artist.store>',
      to: ['dmytro.turskyi@gmail.com'],
      subject: 'New Order Received',
      text: message,
    });
    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
