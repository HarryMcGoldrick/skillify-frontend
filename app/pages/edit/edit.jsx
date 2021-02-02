import React, {
  forwardRef, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { Drawer, Grid } from '@material-ui/core';
import { GraphDetails, GraphToolbar } from '../../components';
import GraphContainer from '../../containers/graph-container/graph-container';
import NodeDrawerPanel from '../../components/node-drawer-panel/node-drawer-panel';

const Edit = (props) => {
  const { id, viewOnly } = props;

  return (
    <Grid container justify="center">
      {/* {cy && (
        <Grid item>
          <Drawer anchor="left" open={toggleGraphDetails} variant="persistent">
            <GraphDetails
              graphName={graphName}
              graphDescription={graphDescription}
              viewOnly={viewOnly}
              // addGraphToProgress={addGraphToProgress}
              progressMode={isProgressMode}
              cy={cy}
            />
          </Drawer>
        </Grid>
      )} */}

      {/* {cy && (
      <Grid item>
        <Drawer
          anchor="right"
          open={Boolean(selectedNode.id)}
          variant="persistent"
        >
          <NodeDrawerPanel nodeData={selectedNode} cy={cy} progressMode={isProgressMode} completedNodes={completedNodes} viewOnly={viewOnly} />
        </Drawer>
      </Grid>
      )} */}

      {/* Inline style has to be used here unfortunately */}
      {/* <Grid item className={toggleGraphDetails ? 'drawer-open' : 'drawer-close'} style={toggleGraphDetails ? { marginLeft: '740px' } : {}}> */}
      {/* <Grid item className={selectedNode.id ? 'node-drawer-open' : 'node-drawer-close'} style={selectedNode.id ? { marginRight: '481px' } : {}}> */}
      <GraphContainer />
      {/* </Grid> */}
      {/* </Grid> */}
    </Grid>

  );
};

Edit.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Edit;
