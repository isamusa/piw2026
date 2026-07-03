import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    
    let res;
    if (type && type !== 'all') {
      res = await query(
        'SELECT * FROM submissions WHERE type = $1 ORDER BY created_at DESC',
        [type]
      );
    } else {
      res = await query('SELECT * FROM submissions ORDER BY created_at DESC');
    }

    return NextResponse.json({
      success: true,
      submissions: res.rows
    });
  } catch (err) {
    console.error('Admin API fetch error:', err);
    return NextResponse.json({ error: 'Failed to query submissions', details: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    await query(
      'UPDATE submissions SET status = $1 WHERE id = $2',
      [status, id]
    );

    return NextResponse.json({ success: true, message: 'Status updated.' });
  } catch (err) {
    console.error('Admin API update error:', err);
    return NextResponse.json({ error: 'Failed to update submission status', details: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const clearAll = searchParams.get('all');

    if (clearAll === 'true') {
      await query('DELETE FROM submissions');
      return NextResponse.json({ success: true, message: 'All submissions cleared.' });
    }

    if (!id) {
      return NextResponse.json({ error: 'Missing id param' }, { status: 400 });
    }

    await query('DELETE FROM submissions WHERE id = $1', [id]);
    return NextResponse.json({ success: true, message: 'Submission deleted.' });
  } catch (err) {
    console.error('Admin API delete error:', err);
    return NextResponse.json({ error: 'Failed to delete submission', details: err.message }, { status: 500 });
  }
}
