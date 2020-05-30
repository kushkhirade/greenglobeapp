import React from 'react';
import { Show } from 'react-admin';
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