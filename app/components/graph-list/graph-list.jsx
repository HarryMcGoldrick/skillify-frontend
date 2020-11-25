import { ListItem, ListItemText } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getGraphIds } from '../../services/graph-service';

const GraphList = () => {
  const [graphIds, setGraphIds] = useState([]);

  useEffect(() => {
    getGraphIds().then((graphs) => {
      setGraphIds(graphs);
    });
  }, []);

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <ul>
      {graphIds.map((graph) => (
        <ListItemLink key={graph} href={`/create/${graph}`}>
          <ListItemText primary={graph} />
        </ListItemLink>
      ))}
    </ul>
  );
};

export default GraphList;
