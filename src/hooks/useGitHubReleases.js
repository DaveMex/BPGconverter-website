import { useState, useEffect } from 'react';

const REPO_OWNER = 'DaveMex';
const REPO_NAME = 'bpg-converter-app';
const DEFAULT_VERSION = '1.1.0';

export const useGitHubReleases = () => {
    const [releases, setReleases] = useState({
        version: DEFAULT_VERSION,
        releaseUrl: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`,
        windows: {
            exe: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${DEFAULT_VERSION}/BPG%20Converter%20Setup%20${DEFAULT_VERSION}.exe`,
        },
        linux: {
            appImage: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${DEFAULT_VERSION}/BPG%20Converter-${DEFAULT_VERSION}.AppImage`,
            deb: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${DEFAULT_VERSION}/bpg-converter-app_${DEFAULT_VERSION}_amd64.deb`,
            rpm: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${DEFAULT_VERSION}/bpg-converter-app-${DEFAULT_VERSION}.x86_64.rpm`,
        },
        macos: {
            dmg: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${DEFAULT_VERSION}/BPG%20Converter-${DEFAULT_VERSION}.dmg`,
            isUniversal: true,
        },
        releaseNotes: '',
        loading: true,
        error: null
    });

    useEffect(() => {
        let isMounted = true;
        const fetchReleases = async () => {
            try {
                let response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/tags/v${DEFAULT_VERSION}`);
                let isTaggedRelease = response.ok;
                if (!response.ok) {
                    response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`);
                }

                if (!response.ok) {
                    throw new Error(`GitHub API returned status ${response.status}`);
                }

                const data = await response.json();
                let versionTag = data.tag_name ? data.tag_name.replace(/^v/, '') : DEFAULT_VERSION;

                // If GitHub latest is still an older release (e.g. 1.0.4) while v1.1.0 is being published, keep v1.1.0
                if (!isTaggedRelease && versionTag < DEFAULT_VERSION) {
                    versionTag = DEFAULT_VERSION;
                }

                const assets = isTaggedRelease ? (data.assets || []) : [];

                // Windows
                const winExe = assets.find(a => a.name.toLowerCase().endsWith('.exe'))?.browser_download_url
                    || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${versionTag}/BPG%20Converter%20Setup%20${versionTag}.exe`;

                // Linux
                const linuxAppImage = assets.find(a => a.name.toLowerCase().endsWith('.appimage'))?.browser_download_url
                    || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${versionTag}/BPG%20Converter-${versionTag}.AppImage`;
                const linuxDeb = assets.find(a => a.name.toLowerCase().endsWith('.deb'))?.browser_download_url
                    || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${versionTag}/bpg-converter-app_${versionTag}_amd64.deb`;
                const linuxRpm = assets.find(a => a.name.toLowerCase().endsWith('.rpm'))?.browser_download_url
                    || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${versionTag}/bpg-converter-app-${versionTag}.x86_64.rpm`;

                // macOS Universal DMG
                const macDmg = assets.find(a => a.name.toLowerCase().endsWith('.dmg'))?.browser_download_url
                    || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${versionTag}/BPG%20Converter-${versionTag}.dmg`;

                if (isMounted) {
                    setReleases({
                        version: versionTag,
                        releaseUrl: data.html_url || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`,
                        windows: { exe: winExe },
                        linux: {
                            appImage: linuxAppImage,
                            deb: linuxDeb,
                            rpm: linuxRpm
                        },
                        macos: {
                            dmg: macDmg,
                            isUniversal: true
                        },
                        releaseNotes: data.body || '',
                        loading: false,
                        error: null
                    });
                }
            } catch (err) {
                if (isMounted) {
                    // Keep default fallback URLs with latest version 1.1.0
                    setReleases(prev => ({
                        ...prev,
                        loading: false,
                        error: err.message
                    }));
                }
            }
        };

        fetchReleases();
        return () => { isMounted = false; };
    }, []);

    return releases;
};
