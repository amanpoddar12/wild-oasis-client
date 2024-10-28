import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://mywnvryfrakhcxxolupn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15d252cnlmcmFraGN4eG9sdXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5NTI1NjAsImV4cCI6MjA0NTUyODU2MH0.u5hM7hJWBsd_Qa9Kd5rxSo4F8KXXpiFC_MJq594FgpM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
