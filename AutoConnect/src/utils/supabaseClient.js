import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables in Vite (requires VITE_ prefix)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create and export the single shared Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
