import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, userType, company, skills } = await request.json();

    // Validate required fields
    if (!name || !email || !password || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Validate user type
    const validUserTypes = ['devops-user', 'job-seeker', 'freelancer'];
    if (!validUserTypes.includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Prepare user data
    const userData: any = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      userType,
    };

    // Add optional fields based on user type
    if (userType === 'devops-user' && company) {
      userData.company = company.trim();
    }

    if ((userType === 'job-seeker' || userType === 'freelancer') && skills) {
      userData.skills = skills.split(',').map((skill: string) => skill.trim()).filter(Boolean);
    }

    // Create new user
    const user = new User(userData);
    await user.save();

    // Return success response (excluding password)
    const responseUser = user.toJSON();

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: responseUser
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);

    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Handle duplicate key error (in case of race condition)
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
