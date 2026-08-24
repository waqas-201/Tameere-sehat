import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, saveUser, sanitizeUser } from '@/lib/auth-store';
import { signUserToken, hashPassword } from '@/lib/jwt';
import { StoredUserAccount } from '@/lib/auth-types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, phone, city } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const existingUser = findUserByEmail(trimmedEmail);

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const newUser: StoredUserAccount = {
      id: userId,
      name: name.trim(),
      email: trimmedEmail,
      role: 'user', // Default role for registrations is 'user'
      provider: 'email',
      phone: phone || '',
      city: city || 'Karachi',
      createdAt: new Date().toISOString(),
      passwordHash,
      orderCount: 0,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=155e42,199b50&textColor=ffffff`,
    };

    saveUser(newUser);

    const safeUser = sanitizeUser(newUser);
    const token = await signUserToken(safeUser);

    const response = NextResponse.json({
      success: true,
      token,
      user: safeUser,
      message: `Account created successfully! Welcome to Tameer-e-Sehat, ${safeUser.name}.`,
    });

    response.cookies.set({
      name: 'tameer_jwt_token',
      value: token,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
}
