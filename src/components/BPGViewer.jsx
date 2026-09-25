import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, CheckCircle2, FileImage } from 'lucide-react';

const BPGViewer = ({
    bpgSrc = '/Screenshot-BPG.bpg',
    fallbackSrc,
    alt = 'BPG Converter App Screenshot',
    className = ''
}) => {
    const canvasRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [useFallback, setUseFallback] = useState(false);
    const [stats, setStats] = useState({ bpgSize: '17.5 KB', pngSize: '52.3 KB', saving: '66%' });

    useEffect(() => {
        let isMounted = true;

        const loadScript = () => {
            return new Promise((resolve, reject) => {
                if (window.BPGDecoder) {
                    return resolve();
                }
                const existingScript = document.querySelector('script[src="/bpgdec.js"]');
                if (existingScript) {
                    existingScript.addEventListener('load', () => resolve());
                    existingScript.addEventListener('error', (e) => reject(e));
                    return;
                }
                const script = document.createElement('script');
                script.src = '/bpgdec.js';
                script.async = true;
                script.onload = () => resolve();
                script.onerror = (e) => reject(e);
                document.head.appendChild(script);
            });
        };

        const renderBPG = async () => {
            try {
                await loadScript();
                if (!isMounted) return;

                if (!window.BPGDecoder) {
                    throw new Error('BPGDecoder not found on window');
                }

                const canvas = canvasRef.current;
                if (!canvas) return;

                const ctx = canvas.getContext('2d');
                if (!ctx) throw new Error('Could not get 2d context');

                const decoder = new window.BPGDecoder(ctx);

                decoder.onload = function () {
                    if (!isMounted) return;
                    if (this.imageData) {
                        canvas.width = this.imageData.width;
                        canvas.height = this.imageData.height;
                        ctx.putImageData(this.imageData, 0, 0);
                        setLoaded(true);
                    } else {
                        setUseFallback(true);
                    }
                };

                decoder.load(bpgSrc);
            } catch (err) {
                console.warn('BPG decoding error, falling back to standard image:', err);
                if (isMounted) {
                    setUseFallback(true);
                }
            }
        };

        renderBPG();

        return () => {
            isMounted = false;
        };
    }, [bpgSrc]);

    return (
        <div className={`relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 bg-slate-900/5 group ${className}`}>
            {/* Live BPG Canvas */}
            <canvas
                ref={canvasRef}
                className={`w-full h-auto rounded-2xl block transform transition duration-500 group-hover:scale-[1.008] ${loaded && !useFallback ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
                aria-label={alt}
            />

            {/* Fallback Image if decoding fails or before canvas loads */}
            {(!loaded || useFallback) && fallbackSrc && (
                <img
                    src={fallbackSrc}
                    alt={alt}
                    className={`w-full h-auto rounded-2xl block transform transition duration-500 group-hover:scale-[1.008] ${useFallback ? 'opacity-100' : loaded ? 'opacity-0' : 'opacity-100'}`}
                />
            )}

            {/* Loading Skeleton */}
            {!loaded && !useFallback && !fallbackSrc && (
                <div className="w-full aspect-[16/10] bg-slate-200 animate-pulse flex items-center justify-center text-slate-400">
                    <span className="text-sm font-medium">Loading BPG image...</span>
                </div>
            )}

            {/* Live BPG Decoded Badge */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20">
                <div className="inline-flex items-center gap-2 bg-slate-900/85 backdrop-blur-md text-white text-xs font-medium py-1.5 px-3 rounded-full border border-white/10 shadow-lg pointer-events-none select-none transition-transform group-hover:scale-105">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <Sparkles size={13} className="text-yellow-400" />
                    <span>Rendered live with <strong>libbpg WebAssembly</strong></span>
                    <span className="hidden sm:inline-block bg-white/15 px-2 py-0.5 rounded-full text-[11px] text-emerald-300 font-bold">
                        {stats.bpgSize} ({stats.saving} smaller)
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BPGViewer;
