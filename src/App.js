import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Admin, Resource} from 'react-admin';
import {Home,Book,Business,Payment,People,Pages,History,HeadsetMic, Chat} from '@material-ui/icons';
import iLayout from './Custom/iLayout';
import {HomePage} from './Sections';

const salesData={data:[
	{
		id:"o1",
		product:"3W ACE",
		target:"50",
		achieved:"40",
		target_left:"10",
	},{
		id:"o2",
		product:"2W ACE",
		target:"50",
		achieved:"40",
		target_left:"10",
	},{
		id:"o3",
		product:"4W ACE",
		target:"50",
		achieved:"40",
		target_left:"10",
	},{
		id:"o4",
		product:"5W ACE",
		target:"50",
		achieved:"40",
		target_left:"10",
	}
],
total:3}

const getList=(url="",params={})=>new Promise((resolve,reject)=>{
	try{

	resolve(salesData);

	}catch(e){
		reject(e);
	}
	
});

const dataProvider={
	getList
}


function Empty(props){
	return (<h2>Under Construction</h2>);
}

function App() {
	return (
		<div className="App">
			<div>
				<Admin layout={iLayout} dataProvider={dataProvider}>
					<Resource name="Home" title="Home" list={HomePage} icon={Home}/>
					<Resource name="Inventory" list={Empty} icon={Book}/>
					<Resource name="Buy Orders" list={Empty} icon={Payment}/>
					<Resource name="Leads" list={Empty} icon={Pages}/>
					<Resource name="Customers" list={Empty} icon={People}/>
					<Resource name="Transactions" list={Empty} icon={Business}/>
					<Resource name="Report" list={Empty} />
					<Resource name="RTO Process" list={Empty} icon={History}/>
					<Resource name="Communications" list={Empty} icon={HeadsetMic}/>
					<Resource name="Support" list={Empty} icon={Chat}/>
				</Admin>
			</div>
    		</div>
	);
}

export default App;
/*
function App() {
	return (
		<div className="App">
			<div>
				<Admin dataProvider={dataProvider}>
					<Resource name="Agents" list={ListGuesser}/>
					<Resource name="Properties" list={ListGuesser}/>
					<Resource name="Websites" list={ListGuesser}/>
					<Resource name="Scheduler" list={ListGuesser}/>
				</Admin>
			</div>
    		</div>
	);
}

*/