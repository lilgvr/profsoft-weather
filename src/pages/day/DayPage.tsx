import React, { FC } from 'react';
import { useParams } from "react-router-dom";

export const DayPage: FC = () => {
    const { date } = useParams();

    return (
        <main>
            { date }
        </main>
    );
};
