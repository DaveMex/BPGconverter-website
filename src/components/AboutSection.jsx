import React from 'react';
import { Coffee, ExternalLink, Heart } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';

const CreditRow = ({ role, name, link }) => (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
        <td className="py-4 px-4 font-medium text-slate-700">{role}</td>
        <td className="py-4 px-4 text-slate-900 font-semibold">{name}</td>
        <td className="py-4 px-4 text-right">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-secondary text-sm font-medium transition-colors"
            >
                Visit <ExternalLink size={14} className="ml-1" />
            </a>
        </td>
    </tr>
);

const AboutSection = () => {
    return (
        <section id="about" className="py-24 bg-white">
            <div className="container mx-auto px-4">

                {/* Mission */}
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-6">
                        <Heart size={32} fill="currentColor" />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">The Mission</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        The BPG (Better Portable Graphics) format offers a significant advantage over traditional image formats
                        like JPG and PNG. It delivers higher quality at smaller file sizes, thanks to the HEVC video compression standard.
                        <br /><br />
                        Our goal is to make this powerful technology accessible to everyone through a simple, modern desktop application.
                        Whether you're a developer, photographer, or just want to save disk space, BPG Converter is built for you.
                    </p>
                </div>

                {/* Credits */}
                <div className="max-w-4xl mx-auto mb-20">
                    <Card className="overflow-hidden p-0 border-0 shadow-xl shadow-slate-200/50">
                        <div className="p-6 bg-slate-50 border-b border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900">Project Credits</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                                        <th className="py-4 px-4 font-semibold">Role</th>
                                        <th className="py-4 px-4 font-semibold">Name</th>
                                        <th className="py-4 px-4 text-right font-semibold">Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <CreditRow
                                        role="Original BPG Author"
                                        name="Fabrice Bellard"
                                        link="https://bellard.org/bpg/"
                                    />
                                    <CreditRow
                                        role="Lib Update Author"
                                        name="DaveMex"
                                        link="https://github.com/DaveMex/libbpg_updated"
                                    />
                                    <CreditRow
                                        role="App Developer"
                                        name="DaveMex"
                                        link="https://github.com/DaveMex"
                                    />
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Support */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Support the Development</h3>
                    <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                        If this tool saves you time or space, consider buying me a coffee to support future updates and maintenance.
                    </p>
                    <Button
                        href="https://buymeacoffee.com/davemx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25"
                    >
                        <Coffee className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                        Buy Me a Coffee
                    </Button>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;
