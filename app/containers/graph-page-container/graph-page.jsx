import { Drawer, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';
import { GraphDetails, NodeDrawerPanel } from '../../components';
import GraphContainer from '../graph-container/graph-container';
import './graph-page.css';

/*
  Groups the graph page components together and sets their viewOnly props
*/
const GraphPage = (props) => {
  const {
    selectedNode, showGraphDetails, viewOnly,
  } = props;

  useEffect(() => {
    if (!viewOnly) {
      // Triggers the prompt before unloading the page
      window.onbeforeunload = () => true;
    }
  }, []);

  return (
    <div>
      <Grid container justify="center">
        <Grid item>
          <Drawer anchor="left" open={showGraphDetails} variant="persistent">
            <GraphDetails viewOnly={viewOnly} />
          </Drawer>
        </Grid>

        <Grid item>
          <Drawer
            anchor="right"
            open={Boolean(selectedNode.id)}
            variant="persistent"
          >
            <NodeDrawerPanel viewOnly={viewOnly} />
          </Drawer>
        </Grid>

        {/* Inline style has to be used here unfortunately */}
        <Grid item className={showGraphDetails ? 'drawer-open' : 'drawer-close'} style={showGraphDetails ? { marginLeft: '800px' } : {}}>
          <Grid item className={selectedNode.id ? 'node-drawer-open' : 'node-drawer-close'} style={selectedNode.id ? { marginRight: '500px' } : {}}>
            <GraphContainer viewOnly={viewOnly} />
          </Grid>
        </Grid>
      </Grid>

      <Prompt
        when={!viewOnly}
        message="Any unsaved changes will be lost!"
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  elements: state.graph.present.elements,
  selectedNode: state.graph.present.selectedNode,
  showGraphDetails: state.graph.present.showGraphDetails,
});

export default connect(mapStateToProps)(GraphPage);
