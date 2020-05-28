import React from 'react';
import { Datagrid, List,TextField,Show} from 'react-admin';
import {Modal,Fab} from '@material-ui/core';
import {Add} from '@material-ui/icons';
class Communication extends React.Component{
	render(){
		return (<div>
			<h3>Communication</h3>
			<Show {...this.props}>
			</Show>
		</div>);
	}
}

export default Communication;