import React from 'react';
import { Sidebar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

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