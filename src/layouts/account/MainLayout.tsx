import React from 'react';

import Sidebar from './Sidebar';

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
    return (
        <div>
            <Sidebar />
            {children}
        </div>
    );
};

export default MainLayout;
