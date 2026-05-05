CREATE TABLE public.current_book (
  id uuid PRIMARY KEY,
  theme_title text,
  title text,
  author text,
  cover_art text,
  schedule jsonb,
  start_date timestamp,
  end_date timestamp
);
ALTER TABLE public.current_book ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for authenticated users"
    ON public.current_book
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
    TRUE
    );

CREATE POLICY "Enable update for authenticated users"
    ON public.current_book
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    WITH CHECK (
    TRUE
    );