import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

/**
 * GET /api/db/add-notification-columns
 * Add notification tracking columns to registrations table
 */
export async function GET() {
  try {
    // Add notification_sent column
    await sql`
      ALTER TABLE registrations 
      ADD COLUMN IF NOT EXISTS notification_sent BOOLEAN DEFAULT FALSE
    `;
    
    // Add notification_sent_at column
    await sql`
      ALTER TABLE registrations 
      ADD COLUMN IF NOT EXISTS notification_sent_at TIMESTAMP
    `;
    
    // Create index for notification tracking
    await sql`
      CREATE INDEX IF NOT EXISTS idx_registrations_notification 
      ON registrations(notification_sent, payment_status)
    `;

    console.log('✅ Notification columns added successfully');

    return NextResponse.json({
      success: true,
      message: 'Notification columns added successfully',
      columns: ['notification_sent', 'notification_sent_at']
    });
  } catch (error: any) {
    console.error('❌ Migration failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}
