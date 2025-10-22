import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '../../../../lib/db';

/**
 * Initialize database endpoint
 * Call this once after deploying to Vercel to set up tables
 */
export async function GET(request: NextRequest) {
  try {
    const result = await initializeDatabase();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Database initialized successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Database init error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
