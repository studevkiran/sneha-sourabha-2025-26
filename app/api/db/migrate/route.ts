import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

/**
 * Migration endpoint to add registration_number column to existing table
 * Visit this endpoint once to update your database schema
 */
export async function GET(request: NextRequest) {
  try {
    // Add registration_number column if it doesn't exist
    await sql`
      ALTER TABLE registrations 
      ADD COLUMN IF NOT EXISTS registration_number VARCHAR(20) UNIQUE
    `;

    // Create index for the new column
    await sql`
      CREATE INDEX IF NOT EXISTS idx_registrations_number 
      ON registrations(registration_number)
    `;

    // Update existing rows without registration numbers
    const existingRows = await sql`
      SELECT id FROM registrations 
      WHERE registration_number IS NULL 
      ORDER BY id ASC
    `;

    if (existingRows.rows.length > 0) {
      for (let i = 0; i < existingRows.rows.length; i++) {
        const row = existingRows.rows[i];
        const regNumber = `SS2026-${(i + 1).toString().padStart(5, '0')}`;
        
        await sql`
          UPDATE registrations 
          SET registration_number = ${regNumber} 
          WHERE id = ${row.id}
        `;
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Migration completed successfully',
      updated: existingRows.rows.length
    });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        hint: 'This is normal if column already exists'
      },
      { status: 500 }
    );
  }
}
