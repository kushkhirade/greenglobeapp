import React from 'react';
import './App.css';
import {Admin, Resource} from 'react-admin';
import {Home,Book,Business,Payment,People,Pages,History,HeadsetMic, Chat} from '@material-ui/icons';
import iLayout from './Custom/iLayout';
import {HomePage,Support,Rto,Communication} from './Sections';
import data from './data';
function getData(url){

	console.log(url);
	if(url=="Home")
		return data.sales;
	else if(url=="Support")
		return data.support;
	else if(url=="RTO")
		return data.rto;

	return data.sales;
}

const getList=(url="",params={})=>new Promise((resolve,reject)=>{
	try{
		resolve(getData(url));
	}catch(e){
		reject(e);
	}
	
});
const getOne=(url="",params={})=>new Promise((resolve,reject)=>{
	try{

		resolve(getData(url));

	}catch(e){
		reject(e);
	}
	
});

const dataProvider={
	getList,
	getOne
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
					<Resource name="RTO" list={Rto} icon={History}/>
					<Resource name="Communications" list={Communication} icon={HeadsetMic}/>
					<Resource name="Support" list={Support} icon={Chat}/>
				</Admin>
			</div>
    		</div>
	);
}

export default App;
