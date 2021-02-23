import { useState, useCallback } from 'react';

function useDisclosure(isOpenDefault = false) {
    const [isOpen, setIsOpen] = useState(isOpenDefault);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    return { isOpen, open, close };
}

export { useDisclosure };