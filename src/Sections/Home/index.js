import React from 'react';
import { Datagrid, List,TextField,EmailField} from 'react-admin';
function Home(props){
	return (<div>
		<h3>Annual Sales Target</h3>
		<List title="Annual Sales Target" {...props}>
			<Datagrid>
				<TextField source="product" />
				<TextField source="target" />
				<TextField source="achieved" />
				<TextField source="target_left" />
			</Datagrid>
		</List>
		<h3>Monthly Sales Target</h3>
		<List title="Monthly Sales Target" {...props}>
			<Datagrid>
				<TextField source="product" />
				<TextField source="target" />
				<TextField source="achieved" />
				<TextField source="target_left" />
			</Datagrid>
		</List>
	</div>);
}

export default Home;