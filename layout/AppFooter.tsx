/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src={`/layout/images/logo-bibliotec.png`} alt="Logo" height="50" className="mr-2" />
            <img src={`/layout/images/itescham.png`} alt="Logo" height="50" className="mr-2" />
            <img src={`/layout/images/tecnm.png`} alt="Logo" height="50" className="mr-2" />
        </div>
    );
};

export default AppFooter;
