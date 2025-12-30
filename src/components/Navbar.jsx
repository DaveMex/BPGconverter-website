import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';
import logo from '../assets/logo-circular.svg';
import Button from './ui/Button';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-slate-200/50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <img src={logo} alt="BPG Converter Logo" className="w-8 h-8 transition-transform group-hover:scale-110" />
                    <span className="font-bold text-lg text-slate-800">BPG Converter</span>
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    <a href="/#features" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Features</a>
                    <Link to="/developer-guide" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Developer Guide</Link>
                    <a href="/#about" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">About</a>

                    <div className="h-6 w-px bg-slate-200"></div>

                    <a
                        href="https://buymeacoffee.com/davemx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-yellow-500 transition-colors"
                        title="Buy me a coffee"
                    >
                        <Coffee size={20} />
                    </a>

                    <Button href="/#download" variant="primary" className="!py-2 !px-4 text-sm">
                        Download
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
