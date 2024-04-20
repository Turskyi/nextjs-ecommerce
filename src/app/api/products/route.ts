import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const page = url.searchParams.get('page');

  if (page) {
    const currentPage = parseInt(page);
    const pageSize = 8;
    const heroItemCount = 1;

    const totalItemCount = await prisma.product.count();
    const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);
    const products = await prisma.product.findMany({
      orderBy: { id: 'desc' },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json({ products, totalPages });
  } else {
    const products = await prisma.product.findMany({
      orderBy: { id: 'desc' },
    });

    return NextResponse.json({ products });
  }
}
