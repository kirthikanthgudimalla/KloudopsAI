import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret';

export async function POST(request: NextRequest) {
  try {
    const { emailOrUsername, password } = await request.json();

    // Validate required fields
    if (!emailOrUsername || !password) {
      return NextResponse.json(
        { error: 'Email/username and password are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find user by email or username (treating username as email for now)
    const user = await User.findOne({ 
      email: emailOrUsername.toLowerCase() 
    }).select('+password');

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        userType: user.userType
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return success response
    const responseUser = user.toJSON();

    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: responseUser,
        token
      },
      { status: 200 }
    );

    // Set HTTP-only cookie for token
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/'
    });

    return response;

  } catch (error: any) {
    console.error('Login error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
