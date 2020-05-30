import React from 'react';
import { Sidebar } from 'react-admin';

function iSidebar(props){

    return (
        <Sidebar {...props}>
		<div>
			<span>Jon Snow</span>
			{props.children}
		</div>
        </Sidebar>
    );
};
export default iSidebar;