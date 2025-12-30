import { useState, useEffect } from 'react';

export const useOSDetection = () => {
    const [os, setOS] = useState('unknown');

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.includes('win')) {
            setOS('windows');
        } else if (userAgent.includes('mac')) {
            setOS('macos');
        } else if (userAgent.includes('linux')) {
            setOS('linux');
        }
    }, []);

    return os;
};
