import { useState } from "react";

export const useGeolocation = () => {
    const [position, setPosition] = useState<number[]>();

    const options: PositionOptions = {
        timeout: 5000,
        maximumAge: 0
    }

    const success: PositionCallback = (position) => {
        const { coords: { latitude, longitude } } = position;

        setPosition([latitude, longitude]);
    }

    const error: PositionErrorCallback = (positionError) => {

    }

    navigator.geolocation.getCurrentPosition(success, error, options);

    return position;
}
