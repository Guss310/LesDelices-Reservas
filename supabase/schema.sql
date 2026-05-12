-- Les Délices — Esquema de base de datos
-- Ejecutar en Supabase > SQL Editor

-- Tabla de reservas
CREATE TABLE IF NOT EXISTS reservations (
  id              uuid          DEFAULT gen_random_uuid() PRIMARY KEY,
  name            text          NOT NULL,
  email           text          NOT NULL,
  phone           text          NOT NULL,
  date            date          NOT NULL,
  time            time          NOT NULL,
  guests          integer       NOT NULL CHECK (guests BETWEEN 1 AND 20),
  special_requests text         DEFAULT '',
  status          text          DEFAULT 'confirmed'
                                CHECK (status IN ('confirmed', 'cancelled', 'completed')),
  created_at      timestamptz   DEFAULT now()
);

-- Índices para consultas del panel de administración
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date);
CREATE INDEX IF NOT EXISTS idx_reservations_email ON reservations(email);

-- Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Política: usuarios anónimos pueden crear reservas
CREATE POLICY "public_insert" ON reservations
  FOR INSERT TO anon
  WITH CHECK (true);

-- Política: usuarios autenticados (administradores) ven todo
CREATE POLICY "admin_all" ON reservations
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);
