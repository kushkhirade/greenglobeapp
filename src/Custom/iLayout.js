import React from 'react';
import { Layout } from 'react-admin';
import iSidebar from './iSidebar';
import iAppbar from './iAppbar';

const iLayout = (props) => {
    console.log('>> props', props);
    return <Layout {...props} sidebar={iSidebar} appBar={iAppbar} />;
}

export default iLayout;