import { NextResponse } from 'next/server';
import { signUserToken } from '@/lib/jwt';
import { AuthUser } from '@/lib/auth-types';

export async function POST() {
  try {
    const guestNumber = Math.floor(1000 + Math.random() * 9000);
    const guestId = `usr_guest_${Date.now()}_${guestNumber}`;
    
    const guestUser: AuthUser = {
      id: guestId,
      name: `Guest Patient #${guestNumber}`,
      email: `guest_${guestNumber}@guest.tameersehat.pk`,
      role: 'guest',
      provider: 'guest',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=guest${guestNumber}&backgroundColor=78716c`,
      createdAt: new Date().toISOString(),
      orderCount: 0,
    };

    const token = await signUserToken(guestUser, '24h');

    const response = NextResponse.json({
      success: true,
      token,
      user: guestUser,
      message: 'Guest session created successfully',
    });

    response.cookies.set({
      name: 'tameer_jwt_token',
      value: token,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours for guest
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Guest Session Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create guest session' },
      { status: 500 }
    );
  }
}
