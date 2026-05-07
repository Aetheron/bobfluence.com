CREATE TABLE public.book_club_participants (
  current_book_id uuid REFERENCES public.current_book(id),
  user_id uuid REFERENCES auth.users(id)
);
ALTER TABLE public.book_club_participants ENABLE ROW LEVEL SECURITY;