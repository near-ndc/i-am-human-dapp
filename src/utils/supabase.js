import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://uqpgzjvgboztmoranlng.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxcGd6anZnYm96dG1vcmFubG5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU0NTIwMzcsImV4cCI6MTk5MTAyODAzN30.wxACStfSggLMLNXmeH4PMhaJjzOKT7qkc0_24uaURSE"
);
