import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, sanitizeUser } from '@/lib/auth-store';
import { signUserToken, hashPassword } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = findUserByEmail(trimmedEmail);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'No account found with this email address' },
        { status: 401 }
      );
    }

    // Check special demo bypass or hashed password
    const incomingHash = await hashPassword(password);
    const isValidPassword = 
      user.passwordHash === incomingHash || 
      (trimmedEmail === 'admin@tameersehat.pk' && (password === 'hakeem1990' || password === 'admin123')) ||
      (trimmedEmail === 'patient@tameersehat.pk' && (password === 'patient123' || password === '123456'));

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid password. Please check your credentials.' },
        { status: 401 }
      );
    }

    const safeUser = sanitizeUser(user);
    const token = await signUserToken(safeUser);

    const response = NextResponse.json({
      success: true,
      token,
      user: safeUser,
      message: `Welcome back, ${safeUser.name}!`,
    });

    // Set HTTP cookie as well for server components/edge compatibility
    response.cookies.set({
      name: 'tameer_jwt_token',
      value: token,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An internal authentication error occurred' },
      { status: 500 }
    );
  }
}
