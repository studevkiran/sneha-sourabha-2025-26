import { NextRequest, NextResponse } from 'next/server';
import { getRegistrationStats } from '../../../../lib/db';

// Simple authentication check
function checkAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const validPassword = process.env.ADMIN_PASSWORD || 'sneha2026';
  
  if (authHeader !== `Bearer ${validPassword}`) {
    return false;
  }
  return true;
}

/**
 * GET /api/admin/stats
 * Get registration statistics
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

    const result = await getRegistrationStats();

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
    console.error('Stats API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
