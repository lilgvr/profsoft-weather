import { RefObject, useEffect, useState } from "react";

export const useDebounce = <T = string>(val: T, delay: number): T => {
    const [debounceVal, setDebounceVal] = useState(val);

    useEffect(() => {
        if (!val) return;
        const handler = setTimeout(() => {
            setDebounceVal(val);
        }, delay)

        return () => {
            clearTimeout(handler);
        }
    }, [delay, val]);

    return debounceVal;
}

export const useDebounceButton = <T = string>(val: T, delay: number, ref: RefObject<HTMLButtonElement>): T => {
    const [debounceVal, setDebounceVal] = useState(val);

    useEffect(() => {
        const refCurrent = ref.current;
        const handler = setTimeout(() => {
            if (refCurrent) {
                refCurrent.disabled = false;
            }
            setDebounceVal(val);
        }, delay)

        return () => {
            clearTimeout(handler);
            if (refCurrent) {
                refCurrent.disabled = true;
            }
        }
    }, [delay, ref, val]);

    return debounceVal;
}
