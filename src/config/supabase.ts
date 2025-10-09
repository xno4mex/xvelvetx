import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Database } from '../types/database';

const supabaseUrl = 'https://syrizqpkjlwgrorlpzng.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5cml6cXBramx3Z3Jvcmxwem5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3ODE3NTksImV4cCI6MjA3NTM1Nzc1OX0.2OgGtsW0HCwsMgL0qlXKaWLVzeDhTPNtt9Zcxn6SJog';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;
