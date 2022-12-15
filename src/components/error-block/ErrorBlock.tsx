import React, { FC } from 'react';
import styles from "./error-block.module.scss";

export const ErrorBlock: FC<{ message: string }> = ({ message }) => {
    return (
        <section className={ styles.errorBlock }>
            <p>{ message }</p>
        </section>
    );
};
