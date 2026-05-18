export default function StepHeading({stepCount,stepLine}:{stepCount: number, stepLine: string}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Resume Generator</h1>
            <p className="text-slate-300 text-sm mt-1">Step {stepCount}: {stepLine}</p>
        </div>
    </div>
  );
}