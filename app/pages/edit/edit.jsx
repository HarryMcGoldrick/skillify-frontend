import React from 'react';
import { Drawer, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { GraphDetails } from '../../components';
import GraphContainer from '../../containers/graph-container/graph-container';
import NodeDrawerPanel from '../../components/node-drawer-panel/node-drawer-panel';

const Edit = (props) => {
  const {
    viewOnly, selectedNode, showGraphDetails,
  } = props;

  return (
    <Grid container justify="center">
      <Grid item>
        <Drawer anchor="left" open={showGraphDetails} variant="persistent">
          <GraphDetails />
        </Drawer>
      </Grid>

      <Grid item>
        <Drawer
          anchor="right"
          open={Boolean(selectedNode.id)}
          variant="persistent"
        >
          <NodeDrawerPanel viewOnly />
        </Drawer>
      </Grid>

      {/* Inline style has to be used here unfortunately */}
      <Grid item className={showGraphDetails ? 'drawer-open' : 'drawer-close'} style={showGraphDetails ? { marginLeft: '740px' } : {}}>
        <Grid item className={selectedNode.id ? 'node-drawer-open' : 'node-drawer-close'} style={selectedNode.id ? { marginRight: '481px' } : {}}>
          <GraphContainer viewOnly />
        </Grid>
      </Grid>
    </Grid>

  );
};

const mapStateToProps = (state) => ({
  elements: state.graph.elements,
  selectedNode: state.graph.selectedNode,
  showGraphDetails: state.graph.showGraphDetails,
});

export default connect(mapStateToProps)(Edit);
