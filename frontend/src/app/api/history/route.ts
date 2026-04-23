import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromHeaders } from '@/lib/jwt';
import { HistoryService } from '@/services/historyService';

export async function GET(request: NextRequest) {
  const token = getTokenFromHeaders(request.headers);
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const items = await HistoryService.listByUser(payload.userId, 50);
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const token = getTokenFromHeaders(request.headers);
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body?.type || !body?.result) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const created = await HistoryService.create({
      userId: payload.userId,
      type: body.type,
      input: body.input ?? null,
      result: body.result,
      imageUrl: body.imageUrl,
    });

    return NextResponse.json({ item: created }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 });
  }
}
