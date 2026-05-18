'use client'
import { useContext, useState, useEffect } from "react";
import { ResumeDataContext } from "../services/form-context";
import { useRouter } from "next/navigation";
import { InitialData } from "../models";

export default function PreviewStep() {
    const router = useRouter();
    const { resumeData, setResumeData } = useContext(ResumeDataContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [selectedTheme, setSelectedTheme] = useState('slate');

    const resumeThemeList = ["slate", "cyan", "green","blue","violet","lime","sky","indigo","purple"];

    useEffect(() => {
        generatePDF();
    }, [resumeData,selectedTheme]);
    const generatePDF = async () => {

            try {
                setLoading(true);
                const response = await fetch('/api/generateResume', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...resumeData, theme: selectedTheme })
                });

                if (!response.ok) {
                    throw new Error('Failed to generate PDF');
                }

                const pdfBuffer = await response.arrayBuffer();
                const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
    const handleDownload = () => {
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="bg-linear-to-r from-slate-800 to-slate-700 px-4 py-6 shadow-lg border-b border-slate-600">
                <div className="max-w-7xl mx-auto">
                    {/* Top Row: Title and Download Button */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                        <h1 className="text-3xl font-extrabold text-white tracking-wide">Resume Preview</h1>
                        {pdfUrl && !error && (
                            <button
                                onClick={handleDownload}
                                className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                            >
                                <span>⬇️</span> Download PDF
                            </button>
                        )}
                    </div>
                    {/* Bottom Row: Theme Selector and New Resume Button */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <select 
                            className="bg-slate-600 text-white font-semibold py-3 px-4 rounded-xl border border-slate-500 shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            defaultValue={selectedTheme}
                            onChange={(e) => setSelectedTheme(e.target.value)}
                        >
                            {resumeThemeList.map((theme) => (
                                <option key={theme} value={theme}>
                                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                                </option>
                            ))}
                        </select>
                        <button 
                            onClick={() => {
                                localStorage.clear();
                                setResumeData(InitialData);
                                router.push('/');
                            }} 
                            className="bg-linear-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                            <span>🔄</span> Create New Resume
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
                {loading && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600 font-medium">Generating your PDF...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                        <p className="font-semibold">Error generating PDF</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {pdfUrl && !error && (
                    <iframe 
                        src={pdfUrl} 
                        width="100%" 
                        height="100%" 
                        className="border border-gray-300 rounded-lg shadow-lg"
                    />
                )}
            </div>
        </div>
    );
}