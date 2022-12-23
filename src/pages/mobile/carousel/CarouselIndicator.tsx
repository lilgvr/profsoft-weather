import React, { FC, PropsWithChildren } from 'react';
import styles from "./carousel.module.scss";

export const CarouselIndicator: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={ styles.carouselIndicatorCtr }>
            { children }
        </div>
    );
};

export const CarouselDot: FC<{ active: boolean }> = ({ active }) => {
    return (
        <div className={ `${ styles.carouselDot } ${ active ? styles.active : "" }` }></div>
    );
}
