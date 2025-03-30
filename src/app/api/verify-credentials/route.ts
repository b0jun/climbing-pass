import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/shared/lib/prisma';

export async function POST(req: NextRequest) {
  const { identifier, password } = await req.json();

  if (!identifier || !password) {
    return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
  }

  const user = await db.user.findFirst({
    where: { identifier },
  });

  if (!user) {
    return NextResponse.json({ message: 'Invalid identifier' }, { status: 401 });
  }

  let isPasswordValid;
  try {
    isPasswordValid = await bcryptjs.compare(password, user.password);
  } catch (error) {
    return NextResponse.json({ message: 'Password verification failed' }, { status: 500 });
  }

  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
}
