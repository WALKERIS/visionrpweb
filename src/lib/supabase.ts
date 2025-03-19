import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'pkce',
    detectSessionInUrl: true,
    autoRefreshToken: true,
    persistSession: true,
    storage: window.localStorage
  }
});

// Initialize auth state
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session?.user?.id) {
    // Update user profile in the database
    supabase.from('profiles').upsert({
      id: session.user.id,
      discord_id: session.user.user_metadata?.provider_id,
      discord_username: session.user.user_metadata?.full_name,
      updated_at: new Date().toISOString()
    }).then(({ error }) => {
      if (error) {
        console.error('Error updating user profile:', error);
      }
    });
  }
});