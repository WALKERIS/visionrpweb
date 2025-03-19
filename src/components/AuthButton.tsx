import React from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export function AuthButton() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [authLoading, setAuthLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_IN') {
        toast.success('Successfully signed in!');
        navigate('/store');
      } else if (event === 'SIGNED_OUT') {
        toast.success('Successfully signed out!');
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async () => {
    if (user) {
      setAuthLoading(true);
      try {
        await supabase.auth.signOut();
      } catch (error) {
        toast.error('Error signing out. Please try again.');
        console.error('Sign out error:', error);
      } finally {
        setAuthLoading(false);
      }
    } else {
      window.location.href = 'https://discord.com/oauth2/authorize?client_id=1066739340320964688&response_type=code&redirect_uri=https%3A%2F%2Fszaojbyuvplkdjodgwhg.supabase.co%2Fauth%2Fv1%2Fcallback&scope=identify+email';
    }
  };

  if (loading) {
    return (
      <button className="px-6 py-2 rounded-lg font-medium bg-gray-100 text-gray-400 cursor-not-allowed">
        <Loader2 className="w-5 h-5 animate-spin" />
      </button>
    );
  }

  return (
    <button
      onClick={handleAuth}
      disabled={authLoading}
      className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
        user
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-[#7289DA] hover:bg-[#5B73B7] text-white'
      } ${authLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      {authLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <span>{user ? 'Sign Out' : 'Link Discord'}</span>
      )}
    </button>
  );
}