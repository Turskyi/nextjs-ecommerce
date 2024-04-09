import { env } from '@/lib/env';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/configs/auth/authOptions';
import { isAdmin } from '@/lib/utils';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({
      error: '( ͡° ͜ʖ ͡°) Please provide a filename query.',
    });
  }
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: 'You are not admin ಠ_ಠ' });
  }
  const file = request.body || '';
  // ⚠️ The below code is for App Router Route Handlers only
  const blob = await put(filename, file, {
    access: 'public',
    addRandomSuffix: false,
    token: env.BLOB_READ_WRITE_TOKEN,
  });

  return NextResponse.json(blob);
}
