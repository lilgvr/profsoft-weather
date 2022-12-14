import React from "react";
import type {FC} from 'react';

const Layout: FC<React.PropsWithChildren> = ({children}) => {

  return (
    <>
      {children}
    </>
  );
};

export {Layout};
