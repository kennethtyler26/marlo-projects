import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  return NextResponse.json({
    supabaseConfigured: !!(supabaseUrl && supabaseKey),
    supabaseUrl: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'NOT SET',
    keyPresent: !!supabaseKey,
    keyLength: supabaseKey?.length || 0,
    timestamp: new Date().toISOString(),
  });
}
