import React from 'react';
import { Download, Monitor, Command, HardDrive } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import { useOSDetection } from '../hooks/useOSDetection';
import { useGitHubReleases } from '../hooks/useGitHubReleases';

const PlatformCard = ({ icon: Icon, name, version, url, isRecommended, comingSoon, loading, error }) => {
    let buttonText = 'Download';
    let isDisabled = false;

    if (loading) {
        buttonText = 'Loading...';
        isDisabled = true;
    } else if (error) {
        buttonText = 'Error';
        isDisabled = true;
    } else if (comingSoon) {
        buttonText = 'Coming Soon';
        isDisabled = true;
    } else if (!url) {
        buttonText = 'Unavailable';
        isDisabled = true;
    }

    return (
        <Card className={`relative flex flex-col items-center text-center ${isRecommended ? 'border-primary ring-2 ring-primary ring-offset-2' : ''}`}>
            {isRecommended && (
                <div className="absolute -top-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    Recommended
                </div>
            )}
            <div className={`p-4 rounded-full bg-slate-100 mb-4 ${isRecommended ? 'text-primary' : 'text-slate-600'}`}>
                <Icon size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">{name}</h3>
            <p className="text-sm text-slate-500 mb-6">{comingSoon ? 'Coming Soon' : (version || 'Latest Version')}</p>

            <Button
                href={url}
                variant={isRecommended ? 'primary' : 'secondary'}
                className="w-full"
                disabled={isDisabled}
                target="_blank"
                rel="noopener noreferrer"
            >
                {buttonText}
            </Button>
        </Card>
    );
};

const DownloadSection = () => {
    const os = useOSDetection();
    const { windows, linux, macos, version, loading, error } = useGitHubReleases();

    return (
        <section id="download" className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Download BPG Converter</h2>
                    <p className="text-slate-600 text-lg">
                        Get the latest version for your operating system.
                        Currently v{version || '...'}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <PlatformCard
                        icon={Monitor}
                        name="Windows"
                        version={version}
                        url={windows}
                        loading={loading}
                        error={error}
                        isRecommended={os === 'windows'}
                    />
                    <PlatformCard
                        icon={HardDrive} // Using HardDrive for Linux as a generic icon, or Terminal?
                        name="Linux"
                        version={version}
                        url={linux}
                        loading={loading}
                        error={error}
                        isRecommended={os === 'linux'}
                    />
                    <PlatformCard
                        icon={Command}
                        name="macOS"
                        version={version}
                        url={macos}
                        loading={loading}
                        error={error}
                        isRecommended={os === 'macos'}
                    // User noted: Apple Silicon (arm64) .dmg
                    />
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-500 text-sm">
                        Looking for other versions?
                        <span className="mx-2">•</span>
                        <span className="opacity-50">Debian/Ubuntu .deb (Coming Soon)</span>
                        <span className="mx-2">•</span>
                        <span className="opacity-50">macOS Intel (Coming Soon)</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DownloadSection;
