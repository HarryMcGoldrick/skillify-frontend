import React from 'react';
import GraphPage from '../../containers/graph-page-container/graph-page';

const ViewGraph = (props) => {
  const viewOnly = true;

  return (
   <GraphPage viewOnly={viewOnly}></GraphPage>
  );
};

export default ViewGraph;