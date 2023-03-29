import { useEffect } from 'react';

export const useOverflowHidden = (active: boolean) => {
    useEffect(() => {
        const body = document.querySelector('body');

        if (active) {
            body?.setAttribute('style', 'overflow:hidden');
        } else {
            body?.setAttribute('style', 'overflow:unset');
        }
    }, [active]);
};
