import { sql } from '@vercel/postgres';

export interface Registration {
  id?: number;
  name: string;
  email: string;
  mobile: string;
  club: string;
  registration_type: string;
  registration_amount: number;
  meal_preference: string;
  spouse_name?: string;
  children_count?: number;
  upi_transaction_id?: string;
  upi_id?: string;
  payment_screenshot_url?: string;
  payment_status?: 'pending' | 'verified' | 'rejected';
  registration_status?: 'submitted' | 'confirmed' | 'cancelled';
  admin_notes?: string;
  verified_by?: string;
  verified_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * Initialize database tables
 * Run this once to set up the database
 */
export async function initializeDatabase() {
  try {
    // Create registrations table
    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        mobile VARCHAR(15) NOT NULL,
        club VARCHAR(255) NOT NULL,
        registration_type VARCHAR(50) NOT NULL,
        registration_amount INTEGER NOT NULL,
        meal_preference VARCHAR(20) NOT NULL,
        spouse_name VARCHAR(255),
        children_count INTEGER DEFAULT 0,
        upi_transaction_id VARCHAR(100),
        upi_id VARCHAR(100),
        payment_screenshot_url TEXT,
        payment_status VARCHAR(20) DEFAULT 'pending',
        registration_status VARCHAR(20) DEFAULT 'submitted',
        admin_notes TEXT,
        verified_by VARCHAR(255),
        verified_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_email_mobile UNIQUE (email, mobile)
      )
    `;

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_registrations_mobile ON registrations(mobile)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_registrations_club ON registrations(club)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_registrations_type ON registrations(registration_type)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_registrations_payment_status ON registrations(payment_status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at)`;

    console.log('✅ Database initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return { success: false, error };
  }
}

/**
 * Create a new registration
 */
export async function createRegistration(data: Registration) {
  try {
    const result = await sql`
      INSERT INTO registrations (
        name, email, mobile, club, registration_type, registration_amount,
        meal_preference, spouse_name, children_count, upi_transaction_id, upi_id,
        payment_status, registration_status
      ) VALUES (
        ${data.name}, ${data.email}, ${data.mobile}, ${data.club},
        ${data.registration_type}, ${data.registration_amount},
        ${data.meal_preference}, ${data.spouse_name || null}, ${data.children_count || 0},
        ${data.upi_transaction_id || null}, ${data.upi_id || null},
        ${data.payment_status || 'pending'}, ${data.registration_status || 'submitted'}
      )
      RETURNING *
    `;
    
    return { success: true, data: result.rows[0] };
  } catch (error: any) {
    console.error('Failed to create registration:', error);
    
    // Check for duplicate entry
    if (error.code === '23505') { // Unique constraint violation
      return { success: false, error: 'This email and mobile combination is already registered' };
    }
    
    return { success: false, error: error.message };
  }
}

/**
 * Get all registrations with optional filters
 */
export async function getRegistrations(filters?: {
  payment_status?: string;
  registration_type?: string;
  club?: string;
  search?: string;
}) {
  try {
    let query = 'SELECT * FROM registrations WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.payment_status) {
      query += ` AND payment_status = $${paramIndex}`;
      params.push(filters.payment_status);
      paramIndex++;
    }

    if (filters?.registration_type) {
      query += ` AND registration_type = $${paramIndex}`;
      params.push(filters.registration_type);
      paramIndex++;
    }

    if (filters?.club) {
      query += ` AND club ILIKE $${paramIndex}`;
      params.push(`%${filters.club}%`);
      paramIndex++;
    }

    if (filters?.search) {
      query += ` AND (name ILIKE $${paramIndex} OR email ILIKE $${paramIndex} OR mobile ILIKE $${paramIndex})`;
      params.push(`%${filters.search}%`);
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await sql.query(query, params);
    return { success: true, data: result.rows };
  } catch (error: any) {
    console.error('Failed to fetch registrations:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get a single registration by ID
 */
export async function getRegistrationById(id: number) {
  try {
    const result = await sql`
      SELECT * FROM registrations WHERE id = ${id}
    `;
    
    if (result.rows.length === 0) {
      return { success: false, error: 'Registration not found' };
    }
    
    return { success: true, data: result.rows[0] };
  } catch (error: any) {
    console.error('Failed to fetch registration:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update payment status
 */
export async function updatePaymentStatus(
  id: number, 
  status: 'pending' | 'verified' | 'rejected',
  verifiedBy?: string,
  adminNotes?: string
) {
  try {
    const verifiedAt = status === 'verified' ? new Date().toISOString() : null;
    
    const result = await sql`
      UPDATE registrations 
      SET 
        payment_status = ${status},
        verified_by = ${verifiedBy || null},
        verified_at = ${verifiedAt},
        admin_notes = ${adminNotes || null},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    
    if (result.rows.length === 0) {
      return { success: false, error: 'Registration not found' };
    }
    
    return { success: true, data: result.rows[0] };
  } catch (error: any) {
    console.error('Failed to update payment status:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get registration statistics
 */
export async function getRegistrationStats() {
  try {
    const totalResult = await sql`SELECT COUNT(*) as count FROM registrations`;
    const verifiedResult = await sql`SELECT COUNT(*) as count FROM registrations WHERE payment_status = 'verified'`;
    const pendingResult = await sql`SELECT COUNT(*) as count FROM registrations WHERE payment_status = 'pending'`;
    const rejectedResult = await sql`SELECT COUNT(*) as count FROM registrations WHERE payment_status = 'rejected'`;
    
    const amountResult = await sql`
      SELECT SUM(registration_amount) as total 
      FROM registrations 
      WHERE payment_status = 'verified'
    `;
    
    const byTypeResult = await sql`
      SELECT registration_type, COUNT(*) as count 
      FROM registrations 
      GROUP BY registration_type
      ORDER BY count DESC
    `;
    
    return {
      success: true,
      data: {
        total: parseInt(totalResult.rows[0].count),
        verified: parseInt(verifiedResult.rows[0].count),
        pending: parseInt(pendingResult.rows[0].count),
        rejected: parseInt(rejectedResult.rows[0].count),
        totalAmount: parseInt(amountResult.rows[0].total || 0),
        byType: byTypeResult.rows
      }
    };
  } catch (error: any) {
    console.error('Failed to fetch stats:', error);
    return { success: false, error: error.message };
  }
}
