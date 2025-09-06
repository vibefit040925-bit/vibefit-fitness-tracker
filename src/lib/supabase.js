import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const auth = {
  signUp: (email, password, options = {}) => 
    supabase.auth.signUp({ email, password, options }),
  
  signIn: (email, password) => 
    supabase.auth.signInWithPassword({ email, password }),
  
  signOut: () => 
    supabase.auth.signOut(),
  
  getUser: () => 
    supabase.auth.getUser(),
  
  onAuthStateChange: (callback) => 
    supabase.auth.onAuthStateChange(callback),
};

// Database helpers
export const db = {
  // Users
  getProfile: (userId) =>
    supabase.from('profiles').select('*').eq('id', userId).single(),
  
  updateProfile: (userId, updates) =>
    supabase.from('profiles').update(updates).eq('id', userId),
  
  // Workouts
  getWorkouts: (userId) =>
    supabase.from('workouts').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
  
  addWorkout: (workout) =>
    supabase.from('workouts').insert([workout]),
  
  deleteWorkout: (id) =>
    supabase.from('workouts').delete().eq('id', id),
  
  // Goals
  getGoals: (userId) =>
    supabase.from('goals').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
  
  addGoal: (goal) =>
    supabase.from('goals').insert([goal]),
  
  updateGoal: (id, updates) =>
    supabase.from('goals').update(updates).eq('id', id),
  
  deleteGoal: (id) =>
    supabase.from('goals').delete().eq('id', id),
};