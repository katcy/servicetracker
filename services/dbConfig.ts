import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://djfsafgjzmpzvpgdmrsh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqZnNhZmdqem1wenZwZ2RtcnNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk5ODQzMTgsImV4cCI6MTk4NTU2MDMxOH0.soEsTNYf2PGFziL3csbnpstNBk0BrzHDcaLLkdvDLTU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
