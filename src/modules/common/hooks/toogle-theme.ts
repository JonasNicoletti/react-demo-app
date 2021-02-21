import { useState, useCallback } from "react";

function useToogleTheme() {
    const [state, setState] = useState(localStorage.getItem('theme')?.startsWith('dark') || false);
    const toggle = useCallback(() => {
        setState((currentState) => !currentState);
        localStorage.setItem('theme', !state ? 'dark' : 'light');
    }, [state]);
    return [state, toggle] as const;
}

export { useToogleTheme };