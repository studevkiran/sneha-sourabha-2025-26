-- Sneha Sourabha 2025-26 Registration Database Schema
-- This will be created automatically in Vercel Postgres

-- Main registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  
  -- Personal Information
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  club VARCHAR(255) NOT NULL,
  
  -- Registration Details
  registration_type VARCHAR(50) NOT NULL,
  registration_amount INTEGER NOT NULL,
  meal_preference VARCHAR(20) NOT NULL,
  
  -- Spouse and Children (for Rotarian with Spouse)
  spouse_name VARCHAR(255),
  children_count INTEGER DEFAULT 0,
  
  -- Payment Information
  upi_transaction_id VARCHAR(100),
  upi_id VARCHAR(100),
  payment_screenshot_url TEXT,
  
  -- Status Tracking
  payment_status VARCHAR(20) DEFAULT 'pending', -- pending, verified, rejected
  registration_status VARCHAR(20) DEFAULT 'submitted', -- submitted, confirmed, cancelled
  
  -- Admin Notes
  admin_notes TEXT,
  verified_by VARCHAR(255),
  verified_at TIMESTAMP,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Indexes for faster queries
  CONSTRAINT unique_email_mobile UNIQUE (email, mobile)
);

-- Index for faster searches
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_mobile ON registrations(mobile);
CREATE INDEX IF NOT EXISTS idx_registrations_club ON registrations(club);
CREATE INDEX IF NOT EXISTS idx_registrations_type ON registrations(registration_type);
CREATE INDEX IF NOT EXISTS idx_registrations_payment_status ON registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);

-- Admin users table (for dashboard access)
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin', -- admin, super_admin
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin (password: sneha2026 - CHANGE THIS AFTER DEPLOYMENT!)
-- Password hash for 'sneha2026'
INSERT INTO admin_users (username, password_hash, role) 
VALUES ('admin', '$2a$10$rQZ5qC7xKZ9WxQ8qxQxQxexamplehash', 'super_admin')
ON CONFLICT (username) DO NOTHING;
