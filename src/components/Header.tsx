import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center">
            <span className={`text-2xl font-bold ${isScrolled ? 'text-blue-600' : 'text-blue-600'}`}>
              MindCare
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#how-it-works" 
              className={`font-medium ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-700 hover:text-blue-600'
              } transition-colors`}
            >
              How It Works
            </a>
            <a 
              href="#assessment" 
              className={`font-medium ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-700 hover:text-blue-600'
              } transition-colors`}
            >
              Start Assessment
            </a>
            <a 
              href="#providers" 
              className={`font-medium ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-700 hover:text-blue-600'
              } transition-colors`}
            >
              Our Providers
            </a>
            <a 
              href="#faq" 
              className={`font-medium ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-700 hover:text-blue-600'
              } transition-colors`}
            >
              FAQ
            </a>
            <Button size="sm">Get Started</Button>
          </nav>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#how-it-works" 
              className="font-medium text-gray-700 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#assessment" 
              className="font-medium text-gray-700 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start Assessment
            </a>
            <a 
              href="#providers" 
              className="font-medium text-gray-700 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Providers
            </a>
            <a 
              href="#faq" 
              className="font-medium text-gray-700 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <Button>Get Started</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;