import React from 'react';
import { Datagrid, List,TextField,EmailField,Show} from 'react-admin';
import {Fab, Tab, Paper, Grid, Card, CardHeader, CardMedia,CardContent, CardAction, Collapse} from '@material-ui/core';
import TabPanel from '@material-ui/lab/TabPanel';
import TabList from '@material-ui/lab/TabList';
import TabContext from '@material-ui/lab/TabContext';
import RTOCard from '../../Custom/RTOCard';
import CardGrid from '../../Custom/CardGrid';
import {Add} from '@material-ui/icons';
class Rto extends React.Component{
	state={value:"0"}
	render(){
		return (<div>
			<h3>RTO</h3>
			<Paper>
			<TabContext value={this.state.value}>
				<TabList onChange={(e,value)=>this.setState({value:value})}>
					<Tab label="Pending" value="0" />
					<Tab label="Cleared" value="1" />
				</TabList>
				<TabPanel value="0">
						<List {...this.props}>
							<CardGrid>
								<RTOCard source="rtos" />
							</CardGrid>
						</List>
				</TabPanel>
				<TabPanel value="1">
						<List {...this.props}>
							<CardGrid>
								<RTOCard source="rtos" />
							</CardGrid>
						</List>
				</TabPanel>
			</TabContext>
			</Paper>
			<span style={{position:'absolute',right:20,bottom:20}}><Fab color='secondary' aria-labelledby='add-ticket' component='a' href="/#/Leads" ><Add /></Fab></span>
		</div>);
	}
}

export default Rto;