import { useState, useEffect } from 'react';

const REPO_OWNER = 'DaveMex';
const REPO_NAME = 'bpg-converter-app';
const DEFAULT_VERSION = '1.1.1';

const DEFAULT_STATE = {
    version: DEFAULT_VERSION,
    releaseUrl: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`,
    windows: {
        exe: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${DEFAULT_VERSION}/BPG-Converter-Setup-${DEFAULT_VERSION}.exe`,
    },
    linux: {
        appImage: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${DEFAULT_VERSION}/BPG-Converter-${DEFAULT_VERSION}.AppImage`,
        deb: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${DEFAULT_VERSION}/bpg-converter-app_${DEFAULT_VERSION}_amd64.deb`,
        rpm: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${DEFAULT_VERSION}/bpg-converter-app-${DEFAULT_VERSION}.x86_64.rpm`,
    },
    macos: {
        dmg: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${DEFAULT_VERSION}/BPG-Converter-${DEFAULT_VERSION}-universal.dmg`,
        isUniversal: true,
    },
    releaseNotes: '',
    loading: true,
    error: null
};

let cachedReleaseState = null;
let releaseFetchPromise = null;

const fetchLatestReleases = async () => {
    if (cachedReleaseState) return cachedReleaseState;
    if (releaseFetchPromise) return releaseFetchPromise;

    releaseFetchPromise = (async () => {
        try {
            // First attempt to get the latest release dynamically
            let response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`);
            if (!response.ok) {
                // Fallback to specific default version tag if latest is unavailable
                response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/tags/v${DEFAULT_VERSION}`);
            }

            if (!response.ok) {
                throw new Error(`GitHub API returned status ${response.status}`);
            }

            const data = await response.json();
            const versionTag = data.tag_name ? data.tag_name.replace(/^v/, '') : DEFAULT_VERSION;
            const assets = Array.isArray(data.assets) ? data.assets : [];

            // Windows
            const winExe = assets.find(a => a.name.toLowerCase().endsWith('.exe'))?.browser_download_url
                || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${versionTag}/BPG-Converter-Setup-${versionTag}.exe`;

            // Linux
            const linuxAppImage = assets.find(a => a.name.toLowerCase().endsWith('.appimage'))?.browser_download_url
                || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${versionTag}/BPG-Converter-${versionTag}.AppImage`;
            const linuxDeb = assets.find(a => a.name.toLowerCase().endsWith('.deb'))?.browser_download_url
                || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${versionTag}/bpg-converter-app_${versionTag}_amd64.deb`;
            const linuxRpm = assets.find(a => a.name.toLowerCase().endsWith('.rpm'))?.browser_download_url
                || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${versionTag}/bpg-converter-app-${versionTag}.x86_64.rpm`;

            // macOS DMG (Universal)
            const macDmg = assets.find(a => a.name.toLowerCase().endsWith('.dmg'))?.browser_download_url
                || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v${versionTag}/BPG-Converter-${versionTag}-universal.dmg`;

            cachedReleaseState = {
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
            };
            return cachedReleaseState;
        } catch (err) {
            // Keep default fallback URLs with latest version 1.1.1
            cachedReleaseState = {
                ...DEFAULT_STATE,
                loading: false,
                error: err.message
            };
            return cachedReleaseState;
        } finally {
            releaseFetchPromise = null;
        }
    })();

    return releaseFetchPromise;
};

export const useGitHubReleases = () => {
    const [releases, setReleases] = useState(() => cachedReleaseState || DEFAULT_STATE);

    useEffect(() => {
        let isMounted = true;
        if (!cachedReleaseState) {
            fetchLatestReleases().then(data => {
                if (isMounted) setReleases(data);
            });
        }
        return () => { isMounted = false; };
    }, []);

    return releases;
};
