import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://drnwbjvpmyrxxhvxraot.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRybndianZwbXlyeHhodnhyYW90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MDYwNzAsImV4cCI6MjA2ODE4MjA3MH0.m0Qx8Ff8RJsw-NBGj5t1_XINg3PKimW7MFZL2gVex8U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 