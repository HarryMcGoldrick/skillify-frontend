import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

function CytoscapeGraph(props) {
  const { elements, cyRef } = props;

  return (
    <div>
      <CytoscapeComponent
        className="graph"
        elements={elements}
        cy={(cy) => {
          cyRef = cy;
        }}
      />
    </div>
  );
}

export default CytoscapeGraph;
