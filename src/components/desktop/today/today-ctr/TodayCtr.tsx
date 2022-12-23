import React, { FC, PropsWithChildren } from 'react';
import styles from "./today-ctr.module.scss";

export const TodayCtr: FC<PropsWithChildren> = ({ children }) => {
    return (
        <section className={ styles.todayCtr }>
            { children }
        </section>
    );
};
