import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, saveUser, sanitizeUser } from '@/lib/auth-store';
import { signUserToken } from '@/lib/jwt';
import { StoredUserAccount } from '@/lib/auth-types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, avatar, googleId } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Google email is required' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    let user = findUserByEmail(trimmedEmail);

    if (user) {
      // User exists, update avatar or provider metadata if not set
      if (!user.avatar && avatar) {
        user.avatar = avatar;
      }
      saveUser(user);
    } else {
      // Create new user authenticated via Google
      const generatedName = name || trimmedEmail.split('@')[0];
      const userId = `usr_g_${googleId || Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      
      const newUser: StoredUserAccount = {
        id: userId,
        name: generatedName,
        email: trimmedEmail,
        role: trimmedEmail.includes('admin') ? 'admin' : 'user',
        provider: 'google',
        avatar: avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(generatedName)}&backgroundColor=4285f4&textColor=ffffff`,
        createdAt: new Date().toISOString(),
        orderCount: 0,
      };

      saveUser(newUser);
      user = newUser;
    }

    const safeUser = sanitizeUser(user);
    const token = await signUserToken(safeUser);

    const response = NextResponse.json({
      success: true,
      token,
      user: safeUser,
      message: `Signed in with Google as ${safeUser.name}`,
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
    console.error('Google Auth Error:', error);
    return NextResponse.json(
      { success: false, message: 'Google authentication failed' },
      { status: 500 }
    );
  }
}
