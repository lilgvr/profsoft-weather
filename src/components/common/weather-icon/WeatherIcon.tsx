import React, { FC, useEffect, useState } from 'react';
import styles from "./weather-icon.module.scss";

const WeatherIcon: FC<{
    icon: string,
    caption?: string,
    className?: string
}> = ({ icon, caption, className }) => {
    const [svgIcon, setSvgIcon] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        import(`/src/assets/icons/weather/${ icon }.svg`).then(img => {
            setSvgIcon(img.default);
            setIsLoading(false);
        }).catch(err => {
            console.log(err)
        });
    }, [icon]);

    return (
        <div className={ className ?? styles.weatherIconCtr }>
            {
                isLoading ?
                    <p>Загузка...</p> :
                    <>
                        <img src={ svgIcon } alt=""/>
                        <figcaption>{ caption }</figcaption>
                    </>
            }
        </div>
    );
};

export default WeatherIcon;
