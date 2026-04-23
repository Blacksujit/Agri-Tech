import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/authService';
import { SignupRequest } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequest = await request.json();
    
    // Validate input
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (body.password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const result = await AuthService.signup(body);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
