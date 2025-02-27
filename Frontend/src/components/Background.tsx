import React, { ReactNode } from 'react';

interface BackgroundProps {
    children: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
    return (
        <div className="absolute inset-0 flex justify-center items-center h-full w-full bg-slate-900 overflow-hidden p-6">
            <div className="absolute z-0 inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#3b82f6_0deg,#10b981_72deg,#6366f1_144deg,#8b5cf6_216deg,#ec4899_288deg,#3b82f6_360deg)] animate-[spin_4s_linear_infinite] opacity-90 blur-[200px]"></div>
            <div className="absolute inset-0 bg-slate-900 opacity-75"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_-100%,#ffffff10,transparent)]"></div>
            <div className="relative z-40 w-full h-full bg-black/80 rounded-2xl  overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-60 backdrop-blur-lg"></div>
                <div className="absolute inset-0 bg-slate-900 opacity-80"></div>
                {children}
            </div>
        </div>
    );
}

export default Background;
