import React from 'react';
import { AppBar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
///import Typography from '@material-ui/core/Typography'; //for future use
const classes = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});

function iAppbar(props){
    return (
        <AppBar {...props}>
		<Toolbar>
			<div className={classes.title}><h3>{window.location.hash.split("#/")[1]}</h3></div>
			<span className={classes.spacer} />
		</Toolbar>
        </AppBar>
    );
};
export default iAppbar;