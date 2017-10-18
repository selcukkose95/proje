import React from 'react';
import Alert from 'react-s-alert';
import Baslik from '../imports/ui/Baslik.js';

const MainLayout = ({ icerik }) => {


    return (
        <div id="ana_parca">
            <Baslik />
            { icerik }
        </div>
    );
};

export default MainLayout;