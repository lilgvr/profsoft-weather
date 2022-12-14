export const getGeolocation = () => {
    let res: number[] = [];

    const options: PositionOptions = {
        timeout: 5000,
        maximumAge: 0
    }
    const success: PositionCallback = (position) => {
        const { coords: { latitude, longitude } } = position;

        res = [latitude, longitude];
    }

    const error: PositionErrorCallback = (positionError) => {

    }

    navigator.geolocation.getCurrentPosition(success, error, options);

    return res;
}
