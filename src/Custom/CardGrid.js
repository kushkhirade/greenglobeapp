import React, { Children, isValidElement, cloneElement } from 'react';
import {Grid} from '@material-ui/core';

function CardGrid({ ids, data, basePath, children }) {

    const childrenWithProps = Children.map(children, child => {
      if (isValidElement(child)) {
        return ids.map(id => cloneElement(child, { record:data[id],basePath }));
      }

      return child;
    });

    return <Grid container spacing={3}>{childrenWithProps}</Grid>
  
};

export default CardGrid