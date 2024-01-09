import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const supabaseUrl = "https://plgvwkkuqxvmjvnjiybq.supabase.co";
export const supabase = createClient(supabaseUrl, supabaseKey!);
