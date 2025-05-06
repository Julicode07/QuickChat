import React, { useState, useEffect } from 'react';

interface Props {
    children: React.ReactNode;
    delay?: number;
    fallback: React.ReactNode;
}

const DelayedFallback = ({ children, delay = 1500, fallback }: Props) => {
    const [showChildren, setShowChildren] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setShowChildren(true), delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    return <>{showChildren ? children : fallback}</>;
};

export default DelayedFallback;
