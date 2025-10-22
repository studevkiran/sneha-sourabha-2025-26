import { NextRequest, NextResponse } from 'next/server';
import { getRegistrations, getRegistrationStats, updatePaymentStatus } from '../../../../lib/db';

// Simple authentication check (you can enhance this later)
function checkAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  // For now, use a simple password. Change this in production!
  const validPassword = process.env.ADMIN_PASSWORD || 'sneha2026';
  
  if (authHeader !== `Bearer ${validPassword}`) {
    return false;
  }
  return true;
}

/**
 * GET /api/admin/registrations
 * Fetch all registrations with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!checkAuth(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    
    const filters = {
      payment_status: searchParams.get('payment_status') || undefined,
      registration_type: searchParams.get('registration_type') || undefined,
      club: searchParams.get('club') || undefined,
      search: searchParams.get('search') || undefined,
    };

    const result = await getRegistrations(filters);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data
    });

  } catch (error: any) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/registrations
 * Update payment status
 */
export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    if (!checkAuth(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, payment_status, verified_by, admin_notes } = body;

    if (!id || !payment_status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: id, payment_status' },
        { status: 400 }
      );
    }

    if (!['pending', 'verified', 'rejected'].includes(payment_status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment_status. Must be: pending, verified, or rejected' },
        { status: 400 }
      );
    }

    const result = await updatePaymentStatus(
      parseInt(id),
      payment_status,
      verified_by,
      admin_notes
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Payment status updated to ${payment_status}`,
      data: result.data
    });

  } catch (error: any) {
    console.error('Admin update error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
