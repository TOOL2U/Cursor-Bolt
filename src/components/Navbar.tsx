import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const shouldUseTransparentBg = isHomePage && !isScrolled;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      shouldUseTransparentBg ? 'bg-transparent' : 'bg-black'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/">
            <Logo 
              variant="light"
              className="transform scale-125"
            />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/tools"
              className="font-medium text-white hover:text-[#FFD700] transition-colors"
            >
              Tools
            </Link>
            <a
              href={isHomePage ? '#how-it-works' : '/'}
              className="font-medium text-white hover:text-[#FFD700] transition-colors"
            >
              How It Works
            </a>
            <a
              href="https://wa.me/66933880630"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white hover:text-[#FFD700] transition-colors flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Contact Us
            </a>
            <Link
              to="/basket"
              className="bg-[#FFD700] text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-[#FFE44D] transition-colors flex items-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="text-white" />
            ) : (
              <Menu className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black shadow-lg rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/tools"
                className="font-medium text-white hover:text-[#FFD700]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tools
              </Link>
              <a
                href={isHomePage ? '#how-it-works' : '/'}
                className="font-medium text-white hover:text-[#FFD700]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="https://wa.me/66933880630"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white hover:text-[#FFD700] flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone className="w-5 h-5" />
                Contact Us
              </a>
              <Link
                to="/basket"
                className="bg-[#FFD700] text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-[#FFE44D] transition-colors flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}