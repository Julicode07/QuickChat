import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ModalBackgroundProps {
    children: ReactNode;
}
const ModalBackground: React.FC<ModalBackgroundProps> = ({ children }) => {
    return (
        <>
            <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-xl z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            />
            <motion.div
                className="fixed inset-0 flex items-center justify-center z-50"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </>
    );
};

export default ModalBackground;
