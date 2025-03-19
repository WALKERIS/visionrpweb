import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { Users, GamepadIcon, Shield, Server, Store, Menu, X, BookOpen, ScrollText } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import StorePage from './pages/Store';

interface ServerStatus {
  clients: number;
  sv_maxclients: number;
}

function App() {
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Fetch server status
  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch('https://servers-frontend.fivem.net/api/servers/single/do39my');
        const data = await response.json();
        setServerStatus({
          clients: data.Data.clients,
          sv_maxclients: data.Data.sv_maxclients
        });
      } catch (error) {
        console.error('Error fetching server status:', error);
      }
    };

    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Handle auth callback
  if (location.pathname === '/auth/callback') {
    return <Navigate to="/store" replace />;
  }

  if (location.pathname === '/store') {
    return <StorePage />;
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-[#E6F3FF] relative">
        {/* Video Background */}
        <video
          className="video-background"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1544726982-b414d58fabaa?auto=format&fit=crop&q=80"
          onLoadedData={() => setIsVideoLoaded(true)}
          loading="lazy"
        >
          <source
            src="https://www.youtube.com/watch?v=9FUqmOHu0CA"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay" />

        {/* Navigation */}
        <nav className="bg-white/90 backdrop-blur-sm shadow-md fixed w-full z-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold tracking-tighter text-gray-900">
                VISION<span className="text-[#4A90E2]">RP</span>.LT
              </h1>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Users className="w-5 h-5 text-[#4A90E2]" />
                  <span className="font-medium">
                    {serverStatus ? `${serverStatus.clients}/${serverStatus.sv_maxclients} Players Online` : 'Loading...'}
                  </span>
                </div>
                <a 
                  href="https://visionrp-3.gitbook.io/visionrp-taisykles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#4A90E2] px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                  aria-label="View server rules"
                >
                  <ScrollText className="w-5 h-5" />
                  <span>Rules</span>
                </a>
                <a 
                  href="https://visionrp-3.gitbook.io/visionrp-taisykles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#4A90E2] px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                  aria-label="Open guidebook"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Guidebook</span>
                </a>
                <Link 
                  to="/store"
                  className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                  aria-label="Open store"
                >
                  <Store className="w-5 h-5" />
                  <span>Store</span>
                </Link>
              </div>

              {/* Mobile menu button */}
              <button 
                className="md:hidden text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64' : 'max-h-0'} overflow-hidden bg-white/90 backdrop-blur-sm`}>
            <div className="px-4 py-3 space-y-3">
              <div className="flex items-center space-x-2 text-gray-700">
                <Users className="w-5 h-5 text-[#4A90E2]" />
                <span className="font-medium">
                  {serverStatus ? `${serverStatus.clients}/${serverStatus.sv_maxclients} Players Online` : 'Loading...'}
                </span>
              </div>
              <a 
                href="https://visionrp-3.gitbook.io/visionrp-taisykles"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-gray-700 hover:text-[#4A90E2] px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                aria-label="View server rules"
              >
                <ScrollText className="w-5 h-5" />
                <span>Rules</span>
              </a>
              <a 
                href="https://visionrp-3.gitbook.io/visionrp-taisykles"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-gray-700 hover:text-[#4A90E2] px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                aria-label="Open guidebook"
              >
                <BookOpen className="w-5 h-5" />
                <span>Guidebook</span>
              </a>
              <Link 
                to="/store"
                className="w-full bg-[#4A90E2] hover:bg-[#357ABD] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                aria-label="Open store"
              >
                <Store className="w-5 h-5" />
                <span>Store</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="h-screen relative flex items-center justify-center pt-16">
          <div className="text-center space-y-6 px-4">
            <h2 className="text-6xl font-bold tracking-tighter text-white">
              Welcome to <span className="text-[#4A90E2]">VISIONRP</span>
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Experience next-generation roleplay in our immersive FiveM community
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300">
                Connect Now
              </button>
              <button className="border-2 border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 bg-black/50">
                Discord
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative bg-white/90 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto py-20 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg text-center shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
                <Users className="w-12 h-12 text-[#4A90E2] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Active Community</h3>
                <p className="text-gray-600">Join our thriving community of dedicated roleplayers</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg text-center shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
                <GamepadIcon className="w-12 h-12 text-[#4A90E2] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Custom Scripts</h3>
                <p className="text-gray-600">Unique features and mechanics for enhanced gameplay</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg text-center shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
                <Shield className="w-12 h-12 text-[#4A90E2] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Fair Staff</h3>
                <p className="text-gray-600">Professional and helpful administration team</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg text-center shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
                <Server className="w-12 h-12 text-[#4A90E2] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Stable Performance</h3>
                <p className="text-gray-600">High-performance servers with minimal latency</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative border-t border-[#4A90E2]/20 py-8 bg-white/90 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
            <p>© 2024 VISIONRP.LT - All rights reserved</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;