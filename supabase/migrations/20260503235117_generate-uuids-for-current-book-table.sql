ALTER TABLE public.current_book
ALTER COLUMN id SET DEFAULT gen_random_uuid();