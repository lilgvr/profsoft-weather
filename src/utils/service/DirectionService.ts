enum Directions {
    U = "Ошибка",
    N = "С",
    NE = "СВ",
    E = "В",
    SE = "ЮВ",
    S = "Ю",
    SW = "ЮЗ",
    W = "З",
    NW = "СЗ"
}

export const getDirection = (deg: number): Directions => {
    const rounded = 45 * Math.round(deg / 45);

    switch (rounded) {
        case 0:
        case 360:
            return Directions.N;
        case 45:
            return Directions.NE;
        case 90:
            return Directions.E;
        case 135:
            return Directions.SE;
        case 180:
            return Directions.S;
        case 225:
            return Directions.SW;
        case 270:
            return Directions.W;
        case 315:
            return Directions.NW;
        default:
            return Directions.U
    }
}
