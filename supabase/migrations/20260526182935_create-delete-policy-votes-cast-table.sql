CREATE POLICY "Enable delete for authenticated users"
    ON public.votes_cast
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (
      (SELECT auth.uid()) = user_id
    );