import { createClient } from '@/lib/auth/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Try to get the current session (should be null for unauthenticated)
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    // Try a simple auth health check
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    return NextResponse.json({
      status: 'ok',
      supabaseConnected: true,
      session: session ? 'exists' : 'none',
      sessionError: sessionError?.message || null,
      user: user ? 'exists' : 'none', 
      userError: userError?.message || null,
      envCheck: {
        urlSet: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        urlLength: process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0,
        keySet: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      supabaseConnected: false,
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }
    
    const supabase = await createClient();
    
    // Try to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return NextResponse.json({
      success: !error,
      error: error?.message || null,
      errorCode: error?.status || null,
      hasUser: !!data?.user,
      hasSession: !!data?.session,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
