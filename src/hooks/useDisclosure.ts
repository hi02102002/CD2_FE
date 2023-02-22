import { useCallback, useMemo, useState } from 'react';

/**
 *
 * @param initStateOpen
 *
 * @returns isOpen, onOpen, onToggle, onClose
 */

export const useDisclosure = (initStateOpen?: boolean) => {
    const [isOpen, setIsOpen] = useState<boolean>(initStateOpen || false);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onToggle = useCallback(() => {
        setIsOpen((isOpen) => !isOpen);
    }, []);

    return useMemo(
        () => ({
            isOpen,
            onOpen,
            onToggle,
            onClose,
        }),
        [isOpen, onOpen, onToggle, onClose],
    );
};
