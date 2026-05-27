ALTER TABLE public.votes_cast
DROP CONSTRAINT votes_cast_book_id_fkey;

ALTER TABLE public.votes_cast
ADD CONSTRAINT votes_cast_book_id_fkey
  FOREIGN KEY (book_id)
  REFERENCES public.book_choices(id)
  ON DELETE CASCADE;