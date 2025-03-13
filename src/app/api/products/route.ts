import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const page = url.searchParams.get('page');

  let products;
  let totalPages;

  if (page) {
    const currentPage = parseInt(page);
    const pageSize = 8;
    const heroItemCount = 1;

    const totalItemCount = await prisma.product.count();
    totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);
    products = await prisma.product.findMany({
      orderBy: { id: 'desc' },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });
  } else {
    products = await prisma.product.findMany({
      orderBy: { id: 'desc' },
    });
  }

  // Add CORS headers to the response.
  const headers = {
    // Allow requests from another origin.
    'Access-Control-Allow-Origin': 'https://anna-ecommerce.web.app',
    // Allow GET and OPTIONS requests.
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    // Allowed headers.
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  return NextResponse.json({ products, totalPages }, { headers: headers });
}

// Add an OPTIONS handler to respond to preflight requests.
export async function OPTIONS(request: NextRequest) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };

  return new NextResponse(null, {
    headers: headers,
  });
}
