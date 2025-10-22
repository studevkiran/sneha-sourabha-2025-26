import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

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
 * POST /api/admin/send-notification
 * Send email/SMS notification to a registrant
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!checkAuth(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { registration_id, notification_type, status } = body;

    if (!registration_id || !notification_type || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: registration_id, notification_type, status' },
        { status: 400 }
      );
    }

    // Get registration details
    const regResult = await sql`
      SELECT * FROM registrations WHERE id = ${registration_id}
    `;

    if (regResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }

    const registration = regResult.rows[0];

    // Prepare notification content based on status
    let subject = '';
    let message = '';

    if (status === 'verified') {
      subject = '✅ Registration Confirmed - Sneha Sourabha 2025-26';
      message = `Dear ${registration.name},

Your registration for Sneha Sourabha - District Conference 2025-26 has been CONFIRMED!

Registration Details:
• Registration Number: ${registration.registration_number}
• Type: ${registration.registration_type}
• Amount: ₹${registration.registration_amount}
• Payment Status: VERIFIED ✅

Your payment has been verified and your registration is now complete. You will receive further details about the event shortly.

Thank you for registering!

Best regards,
Sneha Sourabha Organizing Committee`;
    } else if (status === 'rejected') {
      subject = '⚠️ Registration Payment Issue - Sneha Sourabha 2025-26';
      message = `Dear ${registration.name},

We encountered an issue with your registration payment for Sneha Sourabha - District Conference 2025-26.

Registration Number: ${registration.registration_number}
${registration.admin_notes ? `\nReason: ${registration.admin_notes}` : ''}

Please contact the organizing committee to resolve this issue:
• Email: snehasourabha2026@gmail.com
• Phone: +91-XXXXXXXXXX

We're here to help!

Best regards,
Sneha Sourabha Organizing Committee`;
    }

    // In a real application, you would integrate with:
    // 1. Email service (e.g., SendGrid, AWS SES, Resend)
    // 2. SMS service (e.g., Twilio, MSG91, AWS SNS)
    
    // For now, we'll log the notification and update the database
    console.log('=== NOTIFICATION TO SEND ===');
    console.log('To:', registration.email, registration.mobile);
    console.log('Subject:', subject);
    console.log('Message:', message);
    console.log('===========================');

    // Update notification sent status
    await sql`
      UPDATE registrations 
      SET 
        notification_sent = true,
        notification_sent_at = CURRENT_TIMESTAMP
      WHERE id = ${registration_id}
    `;

    return NextResponse.json({
      success: true,
      message: 'Notification prepared (check server logs for content)',
      notification: {
        to: {
          email: registration.email,
          mobile: registration.mobile
        },
        subject,
        preview: message.substring(0, 100) + '...'
      }
    });

  } catch (error: any) {
    console.error('Notification error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
