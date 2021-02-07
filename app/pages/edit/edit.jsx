import React from 'react';
import GraphPage from '../../containers/graph-page-container/graph-page';

const Edit = (props) => {
  const viewOnly = false;

  return (
   <GraphPage viewOnly={viewOnly}></GraphPage>
  );
};

export default Edit
