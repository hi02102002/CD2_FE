import { useEffect, useState } from 'react';

/**
 *
 * @param initStateOpen
 * @param duration
 *
 * @return debounce
 */

export const useDebounce = <T>(initialValue: T, duration = 800) => {
    const [debounce, setDebounce] = useState<T>(initialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(initialValue);
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [initialValue, duration]);

    return debounce;
};
