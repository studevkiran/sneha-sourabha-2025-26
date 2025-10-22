import { NextRequest, NextResponse } from 'next/server';
import { createRegistration, initializeDatabase } from '../../../lib/db';

// Initialize database on first run
let dbInitialized = false;

async function ensureDatabase() {
  if (!dbInitialized) {
    await initializeDatabase();
    dbInitialized = true;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure database is initialized
    await ensureDatabase();

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'mobile', 'club', 'registration_type', 'registration_amount', 'meal_preference'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate mobile format (10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(body.mobile)) {
      return NextResponse.json(
        { success: false, error: 'Mobile number must be 10 digits' },
        { status: 400 }
      );
    }

    // Create registration
    const result = await createRegistration({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      mobile: body.mobile.trim(),
      club: body.club.trim(),
      registration_type: body.registration_type,
      registration_amount: parseInt(body.registration_amount),
      meal_preference: body.meal_preference,
      spouse_name: body.spouse_name?.trim() || null,
      children_count: parseInt(body.children_count) || 0,
      upi_transaction_id: body.upi_transaction_id?.trim() || null,
      upi_id: body.upi_id?.trim() || null,
      payment_status: 'pending',
      registration_status: 'submitted'
    });

    if (!result.success || !result.data) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to create registration' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registration submitted successfully! Your payment is pending verification.',
      data: {
        id: result.data.id,
        registration_number: `SS2026-${String(result.data.id).padStart(5, '0')}`,
        status: 'pending'
      }
    });

  } catch (error: any) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process registration. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to check registration status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const mobile = searchParams.get('mobile');

    if (!email && !mobile) {
      return NextResponse.json(
        { success: false, error: 'Email or mobile number required' },
        { status: 400 }
      );
    }

    // This is a simple status check - you can expand this later
    return NextResponse.json({
      success: true,
      message: 'Use the admin dashboard to check registration status'
    });

  } catch (error: any) {
    console.error('Registration check error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check registration status' },
      { status: 500 }
    );
  }
}
