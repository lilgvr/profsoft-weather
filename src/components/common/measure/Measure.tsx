import React, { FC, useEffect, useState } from 'react';
import styles from "./measure.module.scss";

const Measure: FC<{
    icon: string,
    title: string,
    value: string
}> = ({ icon, title, value }) => {
    const [svgIcon, setSvgIcon] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        import(`/src/assets/icons/${ icon }.svg`).then(img => {
            setSvgIcon(img.default);
            setIsLoading(false);
        }).catch(err => {
            console.log(err)
        });
    }, [icon]);

    return (
        <>
            {
                isLoading ?
                    <p>Загрузка</p> :
                    <>
                        <div className={ styles.measureCtr }>
                            <img src={ svgIcon } alt=""/>
                            <p>{ title }</p>
                            <p>{ value }</p>
                        </div>
                    </>
            }
        </>
    );
};

export default Measure;
