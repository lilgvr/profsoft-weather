import React, { FC, PropsWithChildren } from 'react';
import styles from "./days-ctr.module.scss";

export const DaysCtr: FC<PropsWithChildren> = ({ children }) => {
    return (
        <section className={ styles.daysCtr }>
            { children }
        </section>
    );
};
