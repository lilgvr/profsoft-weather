import { useEffect, useState } from "react";

export const useDebounce = <T = string>(val: T, delay: number) => {
    const [debounceVal, setDebounceVal] = useState(val);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceVal(val);
        }, delay)

        return () => {
            clearTimeout(handler);
        }
    }, [delay, val]);

    return debounceVal;

}
