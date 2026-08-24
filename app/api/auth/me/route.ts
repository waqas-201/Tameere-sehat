import { NextRequest, NextResponse } from 'next/server';
import { verifyUserToken } from '@/lib/jwt';
import { findUserById, findUserByEmail, saveUser, sanitizeUser } from '@/lib/auth-store';

export async function GET(req: NextRequest) {
  try {
    // Check Authorization header or cookie
    const authHeader = req.headers.get('Authorization');
    const tokenFromCookie = req.cookies.get('tameer_jwt_token')?.value;
    
    let token = '';
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (tokenFromCookie) {
      token = tokenFromCookie;
    }

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No authentication token provided' },
        { status: 401 }
      );
    }

    const payload = await verifyUserToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    if (payload.role === 'guest') {
      return NextResponse.json({
        success: true,
        user: {
          id: payload.userId,
          name: payload.name,
          email: payload.email,
          role: 'guest',
          provider: 'guest',
          createdAt: new Date(payload.iat ? payload.iat * 1000 : Date.now()).toISOString(),
        }
      });
    }

    const user = findUserById(payload.userId) || findUserByEmail(payload.email);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error('Me endpoint error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to verify user profile' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const tokenFromCookie = req.cookies.get('tameer_jwt_token')?.value;
    const token = authHeader?.replace('Bearer ', '') || tokenFromCookie;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const payload = await verifyUserToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, phone, address, city, savedMizaj } = body;

    const user = findUserById(payload.userId) || findUserByEmail(payload.email);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found in store' },
        { status: 404 }
      );
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (city !== undefined) user.city = city;
    if (savedMizaj) user.savedMizaj = savedMizaj;

    saveUser(user);

    return NextResponse.json({
      success: true,
      user: sanitizeUser(user),
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
