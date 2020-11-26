import { ListItem, ListItemText } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getGraphViews } from '../../services/graph-service';

const GraphList = () => {
  const [graphViews, setGraphViews] = useState([]);

  useEffect(() => {
    getGraphViews().then((graphs) => {
      setGraphViews(graphs);
    });
  }, []);

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <ul>
      {graphViews.map((graph) => {
        if (!graph.id || !graph.name) {
          return undefined;
        }
        const { id, name } = graph;
        return (
          <ListItemLink key={id} href={`/edit/${id}`}>
            <ListItemText primary={name} />
          </ListItemLink>
        );
      })}
    </ul>
  );
};

export default GraphList;
