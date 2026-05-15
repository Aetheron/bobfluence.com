CREATE TABLE public.book_choices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  title text NOT NULL,
  author text NOT NULL,
  synopsis text NOT NULL,
  cover_art text,
  pages decimal,
  user_id uuid REFERENCES auth.users(id) NOT NULL
);
ALTER TABLE public.book_choices ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Enable insert for authenticated users"
    ON public.book_choices
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
    TRUE
    );

CREATE POLICY "Enable update for authenticated users"
    ON public.book_choices
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    WITH CHECK (
    TRUE
    );

CREATE POLICY "Enable select for authenticated users"
    ON public.book_choices
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (
    TRUE
    );