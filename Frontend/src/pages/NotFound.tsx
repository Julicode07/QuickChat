export default function NotFound() {
    return (
        <div className="absolute inset-0 flex justify-center items-center h-full w-full bg-slate-900 overflow-hidden md:p-6 transition-all duration-300">
            <div className="absolute z-0 inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#3b82f6_0deg,#10b981_72deg,#6366f1_144deg,#8b5cf6_216deg,#ec4899_288deg,#3b82f6_360deg)] animate-[spin_4s_linear_infinite] opacity-90 blur-[200px]"></div>
            <div className="absolute inset-0 bg-slate-900 opacity-75"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_-100%,#ffffff10,transparent)]"></div>
            <div className="flex flex-col items-center justify-center h-screen text-white relative z-50">
                <h1 className="text-[12rem] font-bold">404</h1>
                <h2 className="text-4xl font-bold mt-4">Page Not Found</h2>
                <p className="mt-2">The page you are looking for does not exist.</p>
                <a href="/" className="mt-4 bg-blue-800 text-white font-bold px-3 py-1 rounded-xl space-x-2"><i className="ri-home-3-line"></i><span>Go back to Home</span></a>
            </div>
        </div>
    );
}