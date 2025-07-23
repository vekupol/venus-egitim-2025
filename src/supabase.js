import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xreqdpglacmsaxrafoyz.supabase.co"; // senin projenin URL'si
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyZXFkcGdsYWNtc2F4cmFmb3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNTczOTAsImV4cCI6MjA2ODYzMzM5MH0.zB0XyUA3a99mc1LSHIOyTsSpJq87MOKwwx39WMO_nBM"; // Project settings → API → anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
