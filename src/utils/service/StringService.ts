export const splitFirst = (str: string, separator: string): string[] => {
    const split = str.split(separator);
    return [split.shift() as string, split.join(separator)];
}

export const splitLast = (str: string, separator: string): string[] => {
    const split = str.split(separator);

    return [split.pop() ?? "", split.join(separator)].reverse();
}
