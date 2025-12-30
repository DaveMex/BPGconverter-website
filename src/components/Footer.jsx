import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12">
            <div className="container mx-auto px-4 text-center">
                <p className="mb-4">
                    &copy; {new Date().getFullYear()} BPG Converter - <a href="https://linktr.ee/davemx" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">David Hernandez Mendez</a>. All rights reserved.
                </p>
                <div className="flex justify-center gap-6 text-sm">
                    <a href="https://github.com/DaveMex" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                    <a href="mailto:hola@bpgconverter.com" className="hover:text-white transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
