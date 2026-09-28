import React, { useState } from 'react';
import { 
    Download, 
    Monitor, 
    Command, 
    HardDrive, 
    Terminal, 
    Check, 
    Copy, 
    Info, 
    Sparkles, 
    ChevronDown, 
    ChevronUp,
    ShieldAlert,
    ExternalLink
} from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import { useOSDetection } from '../hooks/useOSDetection';
import { useGitHubReleases } from '../hooks/useGitHubReleases';

const CopyCommand = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center justify-between bg-slate-900 text-slate-200 px-3 py-2 rounded-lg font-mono text-xs mt-2 border border-slate-700/60">
            <span className="truncate mr-2 select-all">{text}</span>
            <button
                onClick={handleCopy}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-800 shrink-0"
                title="Copy to clipboard"
            >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
        </div>
    );
};

const DownloadSection = () => {
    const os = useOSDetection();
    const { windows, linux, macos, version, releaseUrl, loading, error } = useGitHubReleases();
    const [activeLinuxTab, setActiveLinuxTab] = useState('deb');
    const [activeGuideTab, setActiveGuideTab] = useState('windows');
    const [showGuide, setShowGuide] = useState(false);

    return (
        <section id="download" className="py-24 bg-gradient-to-b from-slate-50 to-slate-100/60 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                        <Sparkles size={14} />
                        Release v{version} is Live
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Download BPG Converter
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        High performance, bidirectional image compression for your desktop.
                        Fast, modern, and completely free.
                    </p>
                </div>

                {/* Platform Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
                    {/* WINDOWS */}
                    <Card className={`relative flex flex-col justify-between ${os === 'windows' ? 'border-primary ring-2 ring-primary/40 ring-offset-2' : ''}`}>
                        {os === 'windows' && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                Detected OS
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                                    <Monitor size={28} />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-bold text-slate-900">Windows</h3>
                                    <span className="text-xs text-slate-500 font-medium">Windows 10 / 11 (64-bit)</span>
                                </div>
                            </div>

                            <p className="text-sm text-slate-600 mb-6 text-left">
                                Installer with desktop shortcuts, context integration, and automatic background updates.
                            </p>

                            <div className="space-y-2 mb-6 text-xs text-slate-500">
                                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                                    <span>Format</span>
                                    <span className="font-semibold text-slate-700">NSIS Installer (.exe)</span>
                                </div>
                                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                                    <span>Version</span>
                                    <span className="font-semibold text-slate-700">v{version}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button
                                href={windows?.exe}
                                variant={os === 'windows' ? 'primary' : 'secondary'}
                                className="w-full flex items-center justify-center gap-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Download size={18} />
                                Download for Windows
                            </Button>

                            <button
                                onClick={() => {
                                    setActiveGuideTab('windows');
                                    setShowGuide(true);
                                    document.getElementById('install-guide')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="mt-3 text-xs text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-1 w-full text-center"
                            >
                                <Info size={13} />
                                SmartScreen notice help
                            </button>
                        </div>
                    </Card>

                    {/* macOS UNIVERSAL */}
                    <Card className={`relative flex flex-col justify-between ${os === 'macos' ? 'border-primary ring-2 ring-primary/40 ring-offset-2' : ''}`}>
                        {os === 'macos' && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                Detected OS
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
                                    <Command size={28} />
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-1.5">
                                        <h3 className="text-xl font-bold text-slate-900">macOS</h3>
                                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                                            Universal
                                        </span>
                                    </div>
                                    <span className="text-xs text-slate-500 font-medium">Apple Silicon & Intel x86_64</span>
                                </div>
                            </div>

                            <p className="text-sm text-slate-600 mb-6 text-left">
                                Universal DMG with native execution on M1/M2/M3/M4 chips as well as Intel-based Macs.
                            </p>

                            <div className="space-y-2 mb-6 text-xs text-slate-500">
                                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                                    <span>Architecture</span>
                                    <span className="font-semibold text-slate-700">Apple Silicon + Intel</span>
                                </div>
                                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                                    <span>Format</span>
                                    <span className="font-semibold text-slate-700">Apple Disk Image (.dmg)</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button
                                href={macos?.dmg}
                                variant={os === 'macos' ? 'primary' : 'secondary'}
                                className="w-full flex items-center justify-center gap-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Download size={18} />
                                Download for macOS
                            </Button>

                            <button
                                onClick={() => {
                                    setActiveGuideTab('macos');
                                    setShowGuide(true);
                                    document.getElementById('install-guide')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="mt-3 text-xs text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-1 w-full text-center"
                            >
                                <Info size={13} />
                                Gatekeeper opening help
                            </button>
                        </div>
                    </Card>

                    {/* LINUX MULTI-FORMAT */}
                    <Card className={`relative flex flex-col justify-between ${os === 'linux' ? 'border-primary ring-2 ring-primary/40 ring-offset-2' : ''}`}>
                        {os === 'linux' && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                Detected OS
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                                    <HardDrive size={28} />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-bold text-slate-900">Linux</h3>
                                    <span className="text-xs text-slate-500 font-medium">Ubuntu, Debian, Fedora, Arch</span>
                                </div>
                            </div>

                            <p className="text-sm text-slate-600 mb-4 text-left">
                                Native distribution packages for Debian/Ubuntu, Red Hat/Fedora, plus universal AppImage.
                            </p>

                            {/* Format selector tabs */}
                            <div className="flex bg-slate-100 p-1 rounded-lg mb-4 text-xs font-medium">
                                <button
                                    onClick={() => setActiveLinuxTab('deb')}
                                    className={`flex-1 py-1.5 rounded-md transition-all ${activeLinuxTab === 'deb' ? 'bg-white shadow text-primary font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                                >
                                    .deb
                                </button>
                                <button
                                    onClick={() => setActiveLinuxTab('rpm')}
                                    className={`flex-1 py-1.5 rounded-md transition-all ${activeLinuxTab === 'rpm' ? 'bg-white shadow text-primary font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                                >
                                    .rpm
                                </button>
                                <button
                                    onClick={() => setActiveLinuxTab('appimage')}
                                    className={`flex-1 py-1.5 rounded-md transition-all ${activeLinuxTab === 'appimage' ? 'bg-white shadow text-primary font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                                >
                                    AppImage
                                </button>
                            </div>

                            <div className="space-y-2 mb-6 text-xs text-slate-500">
                                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                                    <span>Target</span>
                                    <span className="font-semibold text-slate-700">
                                        {activeLinuxTab === 'deb' && 'Ubuntu / Debian / Mint'}
                                        {activeLinuxTab === 'rpm' && 'Fedora / RHEL / openSUSE'}
                                        {activeLinuxTab === 'appimage' && 'Universal Standalone'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button
                                href={
                                    activeLinuxTab === 'deb' ? linux?.deb :
                                    activeLinuxTab === 'rpm' ? linux?.rpm :
                                    linux?.appImage
                                }
                                variant={os === 'linux' ? 'primary' : 'secondary'}
                                className="w-full flex items-center justify-center gap-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Download size={18} />
                                Download .{activeLinuxTab}
                            </Button>

                            <button
                                onClick={() => {
                                    setActiveGuideTab('linux');
                                    setShowGuide(true);
                                    document.getElementById('install-guide')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="mt-3 text-xs text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-1 w-full text-center"
                            >
                                <Terminal size={13} />
                                Terminal installation commands
                            </button>
                        </div>
                    </Card>
                </div>

                {/* Additional Links & GitHub Release */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 mb-16">
                    <span>Looking for source code or checksums?</span>
                    <a
                        href={releaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:text-secondary font-medium transition-colors"
                    >
                        View all release files on GitHub
                        <ExternalLink size={14} />
                    </a>
                </div>

                {/* Installation & First Run Guide Section */}
                <div id="install-guide" className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                    <ShieldAlert size={22} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Installation & Security Tips</h3>
                                    <p className="text-xs text-slate-500">Quick guides for first-time installation on your OS</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowGuide(!showGuide)}
                                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-secondary"
                            >
                                {showGuide ? 'Collapse' : 'Expand'}
                                {showGuide ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                        </div>

                        {showGuide && (
                            <div className="animate-fade-in">
                                {/* Guide Tabs */}
                                <div className="flex gap-2 border-b border-slate-200 pb-3 mb-6">
                                    <button
                                        onClick={() => setActiveGuideTab('windows')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeGuideTab === 'windows' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        Windows (SmartScreen)
                                    </button>
                                    <button
                                        onClick={() => setActiveGuideTab('macos')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeGuideTab === 'macos' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        macOS (Gatekeeper)
                                    </button>
                                    <button
                                        onClick={() => setActiveGuideTab('linux')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeGuideTab === 'linux' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        Linux (Commands)
                                    </button>
                                </div>

                                {/* Content Windows */}
                                {activeGuideTab === 'windows' && (
                                    <div className="space-y-4 text-sm text-slate-600">
                                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900">
                                            <p className="font-semibold mb-1 flex items-center gap-2">
                                                <Info size={16} className="text-amber-600" />
                                                Why does Windows SmartScreen display an alert?
                                            </p>
                                            <p className="text-xs leading-relaxed text-amber-800">
                                                As an independent open-source release without a paid enterprise certificate, Microsoft Defender SmartScreen protects users by default until sufficient download reputation is built.
                                            </p>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                                <span className="font-bold text-slate-800 block mb-1">Step 1</span>
                                                <p className="text-xs">When the blue prompt appears (*"Windows protected your PC"*), click the link that says <strong>"More info"</strong> (*Más información*).</p>
                                            </div>
                                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                                <span className="font-bold text-slate-800 block mb-1">Step 2</span>
                                                <p className="text-xs">Click the <strong>"Run anyway"</strong> (*Ejecutar de todas formas*) button that appears at the bottom. The installer will proceed normally.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Content macOS */}
                                {activeGuideTab === 'macos' && (
                                    <div className="space-y-4 text-sm text-slate-600">
                                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900">
                                            <p className="font-semibold mb-1 flex items-center gap-2">
                                                <Info size={16} className="text-amber-600" />
                                                Opening on macOS (Ad-Hoc Signed)
                                            </p>
                                            <p className="text-xs leading-relaxed text-amber-800">
                                                Because BPG Converter is distributed freely without a $99/year Apple Developer membership, Apple Gatekeeper may show <em>"BPG Converter cannot be opened because Apple cannot check it for malicious software"</em>.
                                            </p>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="font-semibold text-slate-800 text-xs uppercase tracking-wider">Method A: Graphical (Recommended)</p>
                                            <ol className="list-decimal list-inside space-y-1 text-xs">
                                                <li>Drag <strong>BPG Converter</strong> to your <code>/Applications</code> folder.</li>
                                                <li><strong>Right-click</strong> (or hold <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">Control</kbd> and click) on the app icon.</li>
                                                <li>Select <strong>Open</strong> from the menu, and confirm by clicking <strong>Open</strong> in the system prompt.</li>
                                            </ol>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-semibold text-slate-800 text-xs uppercase tracking-wider">Method B: Terminal (Instant Quarantine Removal)</p>
                                            <p className="text-xs">Run this single command in Terminal to bypass the Gatekeeper prompt permanently:</p>
                                            <CopyCommand text="xattr -cr /Applications/BPG\ Converter.app" />
                                        </div>
                                    </div>
                                )}

                                {/* Content Linux */}
                                {activeGuideTab === 'linux' && (
                                    <div className="space-y-4 text-sm text-slate-600">
                                        <div>
                                            <span className="font-semibold text-slate-800 text-xs block mb-1">Debian / Ubuntu / Linux Mint (.deb)</span>
                                            <CopyCommand text={`sudo dpkg -i bpg-converter-app_${version}_amd64.deb`} />
                                            <p className="text-[11px] text-slate-500 mt-1">
                                                Note for Ubuntu 24.04+: If the app doesn't launch after installation due to AppArmor namespace restrictions, run: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">sudo chmod 4755 "/opt/BPG Converter/chrome-sandbox"</code>
                                            </p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-slate-800 text-xs block mb-1">Fedora / Red Hat / openSUSE (.rpm)</span>
                                            <CopyCommand text={`sudo rpm -i bpg-converter-app-${version}.x86_64.rpm`} />
                                        </div>
                                        <div>
                                            <span className="font-semibold text-slate-800 text-xs block mb-1">Universal AppImage</span>
                                            <CopyCommand text={`chmod +x "BPG Converter-${version}.AppImage" && ./"BPG Converter-${version}.AppImage"`} />
                                            <p className="text-[11px] text-slate-500 mt-1">
                                                Note for Ubuntu 22.04+ or newer distros: If AppImage does not start, run <code>sudo apt install libfuse2</code>.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadSection;
