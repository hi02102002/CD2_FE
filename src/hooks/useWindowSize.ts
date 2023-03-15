import { useEffect, useState } from 'react';

export const useWindowSize = () => {
    const [sizes, setSize] = useState<{
        width: number;
        height: number;
    }>({ height: 0, width: 0 });

    useEffect(() => {
        const handelResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        handelResize();
        window.addEventListener('resize', handelResize);

        return () => {
            window.removeEventListener('resize', handelResize);
        };
    }, []);

    return sizes;
};
