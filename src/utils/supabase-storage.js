import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ndxjhhgwpydyiayqbkdr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5keGpoaGd3cHlkeWlheXFia2RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc5NTE4NjEsImV4cCI6MTk5MzUyNzg2MX0.AgcfIowsOQgI33phIVVupaMrYI1OgTa9pYJfr2fJGkQ'
);

export const clientStorage = supabase.storage;
