CREATE POLICY "Enable select for authenticated users"
    ON public.current_book
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (
    TRUE
    );