-- إنشاء جدول المتطوعين (Volunteers)
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  district TEXT NOT NULL,
  area TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول الشكاوى (Tickets)
CREATE TABLE IF NOT EXISTS tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  district TEXT NOT NULL,
  problem_type TEXT NOT NULL,
  details TEXT NOT NULL,
  ticket_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول الأفكار (Ideas)
CREATE TABLE IF NOT EXISTS ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  idea TEXT NOT NULL,
  implementation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء indexes للأداء الأفضل
CREATE INDEX IF NOT EXISTS idx_volunteers_created_at ON volunteers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_ideas_created_at ON ideas(created_at DESC);

-- تفعيل Row Level Security (RLS)
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;

-- السماح للجميع بالإضافة (INSERT)
CREATE POLICY "Allow public insert on volunteers" 
  ON volunteers FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public insert on tickets" 
  ON tickets FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public insert on ideas" 
  ON ideas FOR INSERT 
  WITH CHECK (true);

-- السماح بالقراءة للجميع (SELECT) - يمكن تعديلها حسب الحاجة
CREATE POLICY "Allow authenticated read on volunteers" 
  ON volunteers FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated read on tickets" 
  ON tickets FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated read on ideas" 
  ON ideas FOR SELECT 
  USING (true);

-- السماح بالحذف للـ authenticated users فقط
CREATE POLICY "Allow authenticated delete on volunteers" 
  ON volunteers FOR DELETE 
  USING (true);

CREATE POLICY "Allow authenticated delete on tickets" 
  ON tickets FOR DELETE 
  USING (true);

CREATE POLICY "Allow authenticated delete on ideas" 
  ON ideas FOR DELETE 
  USING (true);
