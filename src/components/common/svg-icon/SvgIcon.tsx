import React, { FC, useEffect, useState } from 'react';
import styles from "./svg-icon.module.scss";

export const SvgIcon: FC<{ name: string, onClick?: () => void, width?: string }> = ({ name, onClick, width }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [svgIcon, setSvgIcon] = useState();

    useEffect(() => {
        import(`/src/assets/icons/${ name }.svg`).then(img => {
            setSvgIcon(img.default);
            setIsLoading(false);
        }).catch(err => {
            console.log(err)
        });
    }, [name]);

    return (
        <div
            className={ styles.svgIcon }
            onClick={ onClick }
        >
            {
                isLoading ?
                    <p>Загузка...</p> :
                    <>
                        <img src={ svgIcon } alt="" style={ { width } }/>
                    </>
            }
        </div>
    );
};
