import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ibdjvojwrnigyjkfhhbt.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZGp2b2p3cm5pZ3lqa2ZoaGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM3MjYzNDMsImV4cCI6MTk5OTMwMjM0M30.P2E3Egr9gIqhtDm3l4980sRbsDasusufTY71KfW_jRk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
