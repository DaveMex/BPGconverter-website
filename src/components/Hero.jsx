import React from 'react';
import { 
    Download, 
    Layers, 
    Monitor, 
    Image as ImageIcon, 
    ArrowRightLeft, 
    FolderCheck, 
    Sparkles, 
    Cpu 
} from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import fallbackScreenshot from '../assets/screenshot-BPG-converter.png';
import BPGViewer from './BPGViewer';
import { useGitHubReleases } from '../hooks/useGitHubReleases';

const FeatureItem = ({ icon: Icon, title, description, badge }) => (
    <div className="flex flex-col items-center text-center p-4 relative">
        {badge && (
            <span className="absolute top-0 right-0 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                {badge}
            </span>
        )}
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <Icon size={24} />
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
);

const Hero = () => {
    const { version } = useGitHubReleases();

    return (
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
            <div className="container mx-auto px-4">

                {/* Main Content */}
                <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
                    {/* Announcement Badge */}
                    <a
                        href="#download"
                        className="inline-flex items-center justify-center py-1.5 px-4 mb-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-primary/25 hover:border-primary/50 transition-all hover:scale-[1.02] group cursor-pointer select-none"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2.5 animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-wider text-primary mr-2">New in v{version}</span>
                        <span className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors">
                            Bidirectional ⇄, macOS Universal & Linux .deb/.rpm
                        </span>
                    </a>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                        Convert Images to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-secondary">
                            BPG & Back
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Experience next-generation HEVC compression. Convert JPG, PNG, and WebP into ultra-compact BPG files — and now effortlessly <strong>decode BPG back to PNG or JPEG</strong>.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button href="#download" className="w-full sm:w-auto text-lg px-8 py-4 shadow-lg shadow-primary/25">
                            <Download className="w-5 h-5 mr-2" />
                            Download v{version}
                        </Button>
                        <Button href="#features" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4">
                            Explore Features
                        </Button>
                    </div>
                </div>

                {/* App Screenshot (.bpg decoded live via WebAssembly) */}
                <div className="relative max-w-5xl mx-auto mb-24">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur-2xl opacity-60"></div>
                    <BPGViewer
                        bpgSrc="/Screenshot-BPG.bpg"
                        fallbackSrc={fallbackScreenshot}
                        alt={`BPG Converter v${version} Desktop App Interface`}
                    />
                </div>

                {/* Feature Grid */}
                <div id="features" className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-3">Engineered for Performance and Flexibility</h2>
                        <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base">
                            Built with lightweight native binaries, real-time preview, and full user customization.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card hoverEffect>
                            <FeatureItem
                                icon={ArrowRightLeft}
                                badge="New in v1.1"
                                title="Bidirectional Conversion"
                                description="Encode images to BPG, or drag & drop BPG files to instantly export them back as Lossless PNG or high-quality JPEG."
                            />
                        </Card>
                        <Card hoverEffect>
                            <FeatureItem
                                icon={FolderCheck}
                                badge="New in v1.1"
                                title="Custom Destination Folder"
                                description="Choose where your converted images land with a single click, or keep them beside the source file with quick reset."
                            />
                        </Card>
                        <Card hoverEffect>
                            <FeatureItem
                                icon={Cpu}
                                badge="New in v1.1"
                                title="macOS Universal & Linux .deb"
                                description="Native Apple Silicon (M1/M2/M3/M4) + Intel DMG. Complete Linux distribution support with .deb, .rpm, and AppImage."
                            />
                        </Card>
                        <Card hoverEffect>
                            <FeatureItem
                                icon={ImageIcon}
                                title="Superior Compression"
                                description="Achieve dramatically smaller file sizes than JPG with superior fidelity using x265 or JCT-VC HEVC encoders."
                            />
                        </Card>
                        <Card hoverEffect>
                            <FeatureItem
                                icon={Layers}
                                title="Full Alpha Channel Support"
                                description="Full transparency retention for PNG conversions without the massive file bloat typical of lossless formats."
                            />
                        </Card>
                        <Card hoverEffect>
                            <FeatureItem
                                icon={Sparkles}
                                title="Real-Time Canvas Preview"
                                description="Inspect conversions immediately within the desktop GUI powered by client-side WebAssembly libbpg decoder."
                            />
                        </Card>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
