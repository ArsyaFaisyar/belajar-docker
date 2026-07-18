CREATE TABLE IF NOT EXISTS nasabah (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  no_hp VARCHAR(20),
  alamat TEXT,
  saldo NUMERIC(15, 2) DEFAULT 0 CHECK (saldo >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS set_updated_at ON nasabah;
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON nasabah
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
INSERT INTO nasabah (nama, email, no_hp, alamat, saldo)
VALUES
('Jhon Deo', 'jhon@gmail.com', '08123456789', 'Jakarta', 50000000),
('Budi Ayam', 'ayambudi@gmail.com', '089076543217', 'Semarang', 1000000)
ON CONFLICT (email) DO NOTHING;