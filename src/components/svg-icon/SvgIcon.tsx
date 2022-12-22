import React, { FC, useEffect, useState } from 'react';

export const SvgIcon: FC<{ path: string, onClick?: () => void }> = ({ path, onClick }) => {
    const [svgIcon, setSvgIcon] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        import(`/src/assets/icons/${ path }.svg`).then(img => {
            setSvgIcon(img.default);
            setIsLoading(false);
        }).catch(err => {
            console.log(err)
        });
    }, [path]);

    return (
        <div onClick={ onClick }>
            {
                isLoading ?
                    <p>Загузка...</p> :
                    <>
                        <img src={ svgIcon } alt=""/>
                    </>
            }
        </div>
    );
};
