export const formatDate = (d: number): string => {
    const date = new Date(d);
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export const addDays = (date: number, days: number) => {
    const res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
}

export const formatDateAddDays = (date: number, days: number) => {
    return formatDate(addDays(date, days).getTime());
}
