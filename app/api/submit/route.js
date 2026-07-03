import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req) {
  try {
    const { type, data } = await req.json();

    if (!type || !data) {
      return NextResponse.json({ error: 'Missing type or data parameters' }, { status: 400 });
    }

    // Assign reference key based on category
    const prefixes = {
      partner: 'PT',
      attendee: 'REG',
      hackathon: 'HACK',
      exhibitor: 'EXH',
      volunteer: 'VOL',
      talent: 'TAL'
    };
    const prefix = prefixes[type] || 'SUB';
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    const refCode = `${prefix}-${rand}`;

    // Insert JSONB payload into submissions
    await query(
      'INSERT INTO submissions (ref_code, type, data) VALUES ($1, $2, $3)',
      [refCode, type, data]
    );

    return NextResponse.json({
      success: true,
      refCode,
      message: 'Submission successfully recorded in PostgreSQL.'
    });
  } catch (err) {
    console.error('API submission error:', err);
    return NextResponse.json({
      error: 'Backend Database Connection Error',
      details: err.message
    }, { status: 500 });
  }
}
