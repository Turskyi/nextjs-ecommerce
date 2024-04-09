import { env } from '@/lib/env';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Please provide a filename query  ಠ_ಠ' });
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
