/*
  # Create Complete Marketplace Schema

  1. Tables Created
    - chefs: Chef profiles with ratings, specialties, pricing
    - menus: Chef menus with courses and pricing
    - availabilities: Chef availability calendar
    - bookings: Client booking requests
    - proposals: Chef proposals for bookings
    - conversations: Messaging between clients and chefs
    - reviews: Client reviews for chefs
    - dishes: Individual dishes offered by chefs
    - chef_experiences: Work history
    - chef_certifications: Professional certifications
    - vouchers: Gift vouchers
    - referrals: Referral program
    - chef_subscriptions: Subscription plans
    - transaction_logs: Payment tracking

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table

  3. Enums
    - booking_status: PENDING, PROPOSALS_RECEIVED, ACCEPTED, PAID, CONFIRMED, COMPLETED, CANCELLED
    - proposal_status: PENDING, ACCEPTED, DECLINED
*/

-- Create enums
CREATE TYPE booking_status AS ENUM (
  'PENDING',
  'PROPOSALS_RECEIVED',
  'ACCEPTED',
  'PAID',
  'CONFIRMED',
  'COMPLETED',
  'CANCELLED'
);

CREATE TYPE proposal_status AS ENUM (
  'PENDING',
  'ACCEPTED',
  'DECLINED'
);

-- Chefs table
CREATE TABLE IF NOT EXISTS chefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  bio text NOT NULL,
  specialties text[] NOT NULL DEFAULT '{}',
  cuisine_types text[] NOT NULL DEFAULT '{}',
  price_per_person integer NOT NULL,
  price_range text NOT NULL,
  location text NOT NULL,
  service_radius integer DEFAULT 50,
  years_experience integer NOT NULL,

  profile_image text,
  cover_image text,
  portfolio_images text[] DEFAULT '{}',

  rating numeric(3,2) DEFAULT 0 NOT NULL,
  review_count integer DEFAULT 0 NOT NULL,
  booking_count integer DEFAULT 0 NOT NULL,

  verified boolean DEFAULT false NOT NULL,
  available boolean DEFAULT true NOT NULL,

  stripe_account_id text,
  onboarding_complete boolean DEFAULT false NOT NULL,

  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Menus table
CREATE TABLE IF NOT EXISTS menus (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chef_id uuid REFERENCES chefs(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  courses jsonb NOT NULL,
  price integer NOT NULL,
  servings integer NOT NULL,
  images text[] DEFAULT '{}',
  dietary_info text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Availabilities table
CREATE TABLE IF NOT EXISTS availabilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chef_id uuid REFERENCES chefs(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  available boolean DEFAULT true NOT NULL,
  recurrence_rule text,
  time_slot text,
  max_bookings integer,
  UNIQUE(chef_id, date)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id) NOT NULL,

  event_type text NOT NULL,
  event_date date NOT NULL,
  event_time text NOT NULL,
  location text NOT NULL,
  guest_count integer NOT NULL,

  description text NOT NULL,
  occasion text,

  cuisine_preferences text[] DEFAULT '{}',
  dietary_requirements text[] DEFAULT '{}',
  allergies text,

  budget integer NOT NULL,

  menu_customization text,
  selected_menu_id uuid,

  status booking_status DEFAULT 'PENDING' NOT NULL,

  stripe_session_id text,
  stripe_payment_intent_id text,
  amount_paid integer,

  cancellation_reason text,
  cancelled_by text,
  refund_amount integer,

  tasting_requested boolean DEFAULT false,
  tasting_date date,
  tasting_completed boolean DEFAULT false,

  voucher_code text,

  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  chef_id uuid REFERENCES chefs(id) ON DELETE CASCADE NOT NULL,

  message text NOT NULL,
  proposed_menu jsonb NOT NULL,
  price integer NOT NULL,

  status proposal_status DEFAULT 'PENDING' NOT NULL,

  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,

  UNIQUE(booking_id, chef_id)
);

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  messages jsonb[] DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chef_id uuid REFERENCES chefs(id) ON DELETE CASCADE NOT NULL,
  client_id uuid REFERENCES profiles(id) NOT NULL,
  booking_id uuid REFERENCES bookings(id) UNIQUE NOT NULL,

  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,

  photos text[] DEFAULT '{}',
  chef_photos text[] DEFAULT '{}',
  chef_response text,
  helpful_count integer DEFAULT 0 NOT NULL,
  verified boolean DEFAULT true NOT NULL,

  created_at timestamptz DEFAULT now() NOT NULL
);

-- Dishes table
CREATE TABLE IF NOT EXISTS dishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chef_id uuid REFERENCES chefs(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  prep_time integer NOT NULL,
  base_price integer NOT NULL,
  ingredients text[] DEFAULT '{}',
  allergens text[] DEFAULT '{}',
  image text
);

-- Chef experiences table
CREATE TABLE IF NOT EXISTS chef_experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chef_id uuid REFERENCES chefs(id) ON DELETE CASCADE NOT NULL,
  restaurant text NOT NULL,
  position text NOT NULL,
  start_date date,
  end_date date,
  description text
);

-- Chef certifications table
CREATE TABLE IF NOT EXISTS chef_certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chef_id uuid REFERENCES chefs(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  issuer text NOT NULL,
  certificate_url text
);

-- Vouchers table
CREATE TABLE IF NOT EXISTS vouchers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  amount integer NOT NULL,
  purchased_by_id uuid REFERENCES profiles(id) NOT NULL,
  recipient_email text NOT NULL,
  redeemed boolean DEFAULT false NOT NULL,
  redeemed_by_id uuid REFERENCES profiles(id),
  expires_at timestamptz
);

-- Referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  referee_email text NOT NULL,
  code text UNIQUE NOT NULL,
  status text DEFAULT 'PENDING' NOT NULL,
  reward_amount integer
);

-- Chef subscriptions table
CREATE TABLE IF NOT EXISTS chef_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chef_id uuid REFERENCES chefs(id) ON DELETE CASCADE NOT NULL,
  plan text NOT NULL,
  stripe_subscription_id text,
  status text DEFAULT 'ACTIVE' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Transaction logs table
CREATE TABLE IF NOT EXISTS transaction_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE UNIQUE NOT NULL,
  amount_paid integer NOT NULL,
  chef_amount integer NOT NULL,
  platform_fee integer NOT NULL,
  service_fee integer NOT NULL,
  stripe_payment_intent_id text NOT NULL,
  currency text DEFAULT 'eur' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_chefs_user_id ON chefs(user_id);
CREATE INDEX IF NOT EXISTS idx_chefs_slug ON chefs(slug);
CREATE INDEX IF NOT EXISTS idx_chefs_location ON chefs(location);
CREATE INDEX IF NOT EXISTS idx_chefs_verified ON chefs(verified);
CREATE INDEX IF NOT EXISTS idx_chefs_rating ON chefs(rating DESC);

CREATE INDEX IF NOT EXISTS idx_menus_chef_id ON menus(chef_id);
CREATE INDEX IF NOT EXISTS idx_availabilities_chef_id_date ON availabilities(chef_id, date);
CREATE INDEX IF NOT EXISTS idx_bookings_client_id ON bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_proposals_booking_id ON proposals(booking_id);
CREATE INDEX IF NOT EXISTS idx_proposals_chef_id ON proposals(chef_id);
CREATE INDEX IF NOT EXISTS idx_reviews_chef_id ON reviews(chef_id);
CREATE INDEX IF NOT EXISTS idx_reviews_booking_id ON reviews(booking_id);

-- Enable RLS
ALTER TABLE chefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE availabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE chef_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE chef_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE chef_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Chefs: Public read, chef can update own profile
CREATE POLICY "Chefs are viewable by everyone"
  ON chefs FOR SELECT
  USING (true);

CREATE POLICY "Chefs can update own profile"
  ON chefs FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can create chef profile"
  ON chefs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Menus: Public read, chef can manage own menus
CREATE POLICY "Menus are viewable by everyone"
  ON menus FOR SELECT
  USING (true);

CREATE POLICY "Chefs can manage own menus"
  ON menus FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chefs
      WHERE chefs.id = menus.chef_id
      AND chefs.user_id = auth.uid()
    )
  );

-- Availabilities: Public read, chef can manage own
CREATE POLICY "Availabilities are viewable by everyone"
  ON availabilities FOR SELECT
  USING (true);

CREATE POLICY "Chefs can manage own availabilities"
  ON availabilities FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chefs
      WHERE chefs.id = availabilities.chef_id
      AND chefs.user_id = auth.uid()
    )
  );

-- Bookings: Users can manage own bookings, chefs can view bookings with proposals
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = client_id);

CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = client_id)
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Chefs can view bookings with their proposals"
  ON bookings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM proposals
      JOIN chefs ON chefs.id = proposals.chef_id
      WHERE proposals.booking_id = bookings.id
      AND chefs.user_id = auth.uid()
    )
  );

-- Proposals: Chef can create/manage, client can view
CREATE POLICY "Chefs can create proposals"
  ON proposals FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chefs
      WHERE chefs.id = proposals.chef_id
      AND chefs.user_id = auth.uid()
    )
  );

CREATE POLICY "Chefs can view own proposals"
  ON proposals FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chefs
      WHERE chefs.id = proposals.chef_id
      AND chefs.user_id = auth.uid()
    )
  );

CREATE POLICY "Clients can view proposals for their bookings"
  ON proposals FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = proposals.booking_id
      AND bookings.client_id = auth.uid()
    )
  );

-- Reviews: Public read, clients can create, chefs can respond
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Clients can create reviews for their bookings"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = client_id
    AND EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = reviews.booking_id
      AND bookings.client_id = auth.uid()
      AND bookings.status = 'COMPLETED'
    )
  );

CREATE POLICY "Chefs can update reviews to add response"
  ON reviews FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chefs
      WHERE chefs.id = reviews.chef_id
      AND chefs.user_id = auth.uid()
    )
  )
  WITH CHECK (chef_response IS NOT NULL);

-- Dishes: Public read, chef can manage own
CREATE POLICY "Dishes are viewable by everyone"
  ON dishes FOR SELECT
  USING (true);

CREATE POLICY "Chefs can manage own dishes"
  ON dishes FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chefs
      WHERE chefs.id = dishes.chef_id
      AND chefs.user_id = auth.uid()
    )
  );

-- Chef experiences: Public read, chef can manage own
CREATE POLICY "Chef experiences are viewable by everyone"
  ON chef_experiences FOR SELECT
  USING (true);

CREATE POLICY "Chefs can manage own experiences"
  ON chef_experiences FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chefs
      WHERE chefs.id = chef_experiences.chef_id
      AND chefs.user_id = auth.uid()
    )
  );

-- Chef certifications: Public read, chef can manage own
CREATE POLICY "Chef certifications are viewable by everyone"
  ON chef_certifications FOR SELECT
  USING (true);

CREATE POLICY "Chefs can manage own certifications"
  ON chef_certifications FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chefs
      WHERE chefs.id = chef_certifications.chef_id
      AND chefs.user_id = auth.uid()
    )
  );

-- Update triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_chefs_updated_at
  BEFORE UPDATE ON chefs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menus_updated_at
  BEFORE UPDATE ON menus
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
