import React from 'react';
import * as CytoscapeComponent from 'react-cytoscapejs';

const graph: React.FC = () => {
  const test = '123';

  return (
    <CytoscapeComponent
      className="graph"
      elements={elements}
      cy={(cyto) => {
        setCy(cyto);
      }}
    />
  );
};

export default graph;
