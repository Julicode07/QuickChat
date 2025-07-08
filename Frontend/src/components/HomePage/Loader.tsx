import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
    return (
        <motion.div
            className="absolute inset-0 flex justify-center items-center h-full w-full bg-slate-900 overflow-hidden p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#3b82f6_0deg,#10b981_72deg,#6366f1_144deg,#8b5cf6_216deg,#ec4899_288deg,#3b82f6_360deg)] opacity-90 blur-[200px]"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            />

            <motion.div
                className="absolute inset-0 bg-slate-900 opacity-75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            />

            <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_-100%,#ffffff10,transparent)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: 'easeOut' }}
            />

            <div className="relative z-50 flex flex-col items-center gap-2">
                <img src="/quickchat.webp" alt="Quick Chat" className="w-28 h-28" />
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                    Quick Chat
                </h1>
            </div>
        </motion.div>
    );
};

export default Loader;
