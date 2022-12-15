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

export const getLocalizedDate = (date: Date) => {
    const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
    ];

    const weekDays = [
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб"
    ]

    return `${ weekDays[date.getDay()] }, ${ date.getDate() } ${ months[date.getMonth()] }`
}
