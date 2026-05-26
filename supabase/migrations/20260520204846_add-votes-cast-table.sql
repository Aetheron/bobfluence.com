CREATE TABLE public.votes_cast (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  book_id uuid REFERENCES book_choices(id) NOT NULL,
  CONSTRAINT one_vote_per_book UNIQUE (user_id, book_id)
);
ALTER TABLE public.votes_cast ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for authenticated users"
    ON public.votes_cast
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
      TRUE
    );

CREATE POLICY "Enable select for authenticated users"
    ON public.votes_cast
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (
      TRUE
    );