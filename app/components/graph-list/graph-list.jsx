import { ListItem, ListItemText } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getGraphViews } from '../../services/graph-service';

// Displays a list of graphNames that link to the relevant graph
const GraphList = () => {
  const [graphViews, setGraphViews] = useState([]);

  useEffect(() => {
    // Returns a list of graphIds and graphNames
    getGraphViews().then((graphs) => {
      setGraphViews(graphs);
    });
  }, []);

  // Creates a linkable ListItem
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
          <ListItemLink key={id} href={`/view/${id}`}>
            <ListItemText primary={name} />
          </ListItemLink>
        );
      })}
    </ul>
  );
};

export default GraphList;
