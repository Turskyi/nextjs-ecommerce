import { env } from '@/lib/env';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

export async function send(message: string) {
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
