import React from 'react';
import { Download, Layers, Monitor, Image as ImageIcon } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import logo from '../assets/logo-circular.svg';
import screenshot from '../assets/screenshot-BPG-converter.png';

const FeatureItem = ({ icon: Icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <Icon size={24} />
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
);

const Hero = () => {
    return (
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
            <div className="container mx-auto px-4">

                {/* Main Content */}
                <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
                    <div className="inline-flex items-center justify-center p-2 mb-8 bg-white rounded-full shadow-sm border border-slate-100 animate-fade-in-up cursor-default select-none">
                        <img src={logo} alt="BPG Logo" className="w-6 h-6 mr-2" />
                        <span className="text-sm font-medium text-slate-600">The Future of Image Compression</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
                        Convert Images to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            BPG Format
                        </span>
                    </h1>

                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Experience superior compression quality and smaller file sizes.
                        The modern desktop tool for converting JPG and PNG to BPG.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button href="#download" className="w-full sm:w-auto text-lg px-8 py-4">
                            <Download className="w-5 h-5 mr-2" />
                            Download Now
                        </Button>
                        <Button href="#features" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4">
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* App Screenshot */}
                <div className="relative max-w-5xl mx-auto mb-24">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-2xl opacity-50"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 bg-slate-900/5">
                        <img
                            src={screenshot}
                            alt="BPG Converter App Screenshot"
                            className="w-full h-auto rounded-2xl transform transition hover:scale-[1.01] duration-500"
                        />
                    </div>
                </div>

                {/* Feature Grid */}
                <div id="features" className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <Card hoverEffect>
                        <FeatureItem
                            icon={ImageIcon}
                            title="High Compression"
                            description="Significantly smaller file sizes than JPG with equal or better quality using HEVC encoding."
                        />
                    </Card>
                    <Card hoverEffect>
                        <FeatureItem
                            icon={Layers}
                            title="Alpha Support"
                            description="Full transparency support for PNG conversions without the massive file size overhead."
                        />
                    </Card>
                    <Card hoverEffect>
                        <FeatureItem
                            icon={Monitor}
                            title="Cross-Platform"
                            description="Native desktop experience available for Windows, Linux, and macOS (Apple Silicon)."
                        />
                    </Card>
                </div>

            </div>
        </section>
    );
};

export default Hero;
