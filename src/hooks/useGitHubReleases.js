import { useState, useEffect } from 'react';

// TODO: Replace with actual repository details
const REPO_OWNER = 'DaveMex';
const REPO_NAME = 'bpg-converter-app';

export const useGitHubReleases = () => {
    const [releases, setReleases] = useState({
        windows: null,
        linux: null,
        macos: null,
        version: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchReleases = async () => {
            try {
                const response = await fetch(`https://api.github.com/repos/DaveMex/bpg-converter-app/releases/latest`);
                if (!response.ok) throw new Error('Failed to fetch releases');

                const data = await response.json();

                const assets = data.assets || [];
                const windows = assets.find(a => a.name.endsWith('.exe'))?.browser_download_url;
                const linux = assets.find(a => a.name.endsWith('.AppImage'))?.browser_download_url;
                const macos = assets.find(a => a.name.endsWith('.dmg'))?.browser_download_url; // Assuming dmg for now, user mentioned arm64 dmg

                setReleases({
                    windows,
                    linux,
                    macos,
                    version: data.tag_name,
                    loading: false,
                    error: null
                });
            } catch (err) {
                setReleases(prev => ({ ...prev, loading: false, error: err.message }));
            }
        };

        fetchReleases();
    }, []);

    return releases;
};
