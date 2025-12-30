import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Code, ExternalLink, Terminal } from 'lucide-react';
import Button from '../components/ui/Button';

const DeveloperGuide = () => {
    return (
        <div className="min-h-screen bg-background text-slate-900 font-sans selection:bg-primary/20 selection:text-primary">
            <Navbar />

            <main className="pt-32 pb-24 container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900">Using BPG on the Web</h1>

                <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                    BPG (Better Portable Graphics) offers strict improvements over JPEG in terms of quality and file size.
                    Since browsers don't support BPG natively yet, you need a small JavaScript decoder to display these images.
                </p>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <Code size={24} />
                        </div>
                        Quick Start
                    </h2>

                    <div className="prose prose-slate max-w-none text-slate-600">
                        <p className="mb-4">
                            To use BPG images on your website, you need to include the <code>bpgdec.js</code> library.
                            This lightweight script (approx. 50KB gzipped) decodes BPG images on the fly using HTML5 Canvas.
                        </p>

                        <div className="bg-slate-900 rounded-xl p-6 mb-6 overflow-x-auto text-sm text-slate-300 font-mono shadow-2xl">
                            <pre>
                                {`<!-- 1. Include the BPG decoder script -->
<script type="text/javascript" src="path/to/bpgdec8.js"></script>

<!-- 2. Use <img> tags as normal (the script will handle them) -->
<img src="image.bpg" />

<!-- OR 3. Manually initialize if needed -->
<script>
    var img = new BPGDecoder(ctx);
    img.onload = function(img) {
        // draw image to canvas
        ctx.putImageData(img.imageData, 0, 0);
    }
    img.load("image.bpg");
</script>`}
                            </pre>
                        </div>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                            <Terminal size={24} />
                        </div>
                        Get the Library
                    </h2>

                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <p className="mb-6 text-slate-600">
                            There is currently no official public CDN for the BPG decoder. We recommended hosting the `bpgdec8.js` file directly on your server for the best performance and reliability.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                href="https://github.com/mirrorer/libbpg/tree/master/html"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="primary"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Download bpgdec.js
                            </Button>
                            <Button
                                href="https://bellard.org/bpg/bpg_js.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="secondary"
                            >
                                View Official Demo
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default DeveloperGuide;
