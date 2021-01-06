import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './graph.css';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import { Drawer, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import dagre from 'cytoscape-dagre';
import automove from 'cytoscape-automove';
import { loadGraphElements } from '../../services/graph-service';
import edgeHandleStyle from './styles';
import GraphDetails from '../graph-details/graph-details';
import GraphToolbar from '../graph-toolbar/graph-toolbar';
import NodeDetails from '../node-details/node-details';

export default class Graph extends Component {
  constructor() {
    super();
    this.state = {
      elements: [],
      selectedNode: {},
      drawerOpen: false,
    };
  }

  componentDidMount = () => {
    const { id, viewOnly } = this.props;
    this.initCytoscapeExtensions();

    if (viewOnly) {
      this.initViewMode();
    } else {
      this.initEditMode();
    }

    // Use the graphId from the url to load the associated graph
    loadGraphElements(id).then((data) => {
      const graphName = data.graph.name;
      const graphDescription = data.graph.description;
      const cytoscapeData = [...data.graph.nodes, ...data.graph.edges];
      this.setState({
        elements: cytoscapeData,
        graphName,
        graphDescription,
      });
      // Center the graph with a padding of 200
      this.cy.fit(200);
    });
  };

  // Adds drawable edges to nodes
  enableEdgehandles = () => {
    if (!this.cy.edgehandles) {
      cytoscape.use(edgehandles);
      this.cy.style(edgeHandleStyle);
      const edgehandler = this.cy.edgehandles();
      edgehandler.disableDrawMode();
    }
  }

  selectNode = (node) => {
    this.setState({ selectedNode: { ...node } });
  };

  initCytoscapeExtensions = () => {
    // Layouts & extensions
    cytoscape.use(dagre);
    cytoscape.use(automove);
    // Prevent moving nodes out of viewport
    this.cy.automove({
      // eslint-disable-next-line no-unused-vars
      nodesMatching(node) { return true; },
      reposition: 'viewport',
    });
  }

  initEditMode = () => {
    this.enableEdgehandles();
  }

  initViewMode = () => {
    this.cy.autolock(true);
  }

  render() {
    const {
      elements, selectedNode, graphName, drawerOpen, graphDescription,
    } = this.state;

    const { viewOnly, id: graphId } = this.props;
    const nodeSelected = Boolean(selectedNode.id);

    return (
      <Grid container justify="center">

        <Grid item>
          <Drawer anchor="left" open={drawerOpen} variant="persistent">
            <GraphDetails
              graphName={graphName}
              graphDescription={graphDescription}
              viewOnly={viewOnly}
            />
          </Drawer>
        </Grid>

        {/* Inline style has to be used here unfortunately */}
        <Grid item className={drawerOpen ? 'drawer-open' : 'drawer-close'} style={drawerOpen ? { marginLeft: '740px' } : {}}>

          {!viewOnly && this.cy && (
          <GraphToolbar
            graphId={graphId}
            updateData={this.updateData}
            selectNode={this.selectNode}
            cy={this.cy}
          />
          )}

          <NodeDetails isOpen={nodeSelected} nodeData={selectedNode} />

          <CytoscapeComponent
            className="graph"
            elements={elements}
            cy={(cy) => {
              this.cy = cy;
            }}
          />
        </Grid>
      </Grid>

    );
  }
}

Graph.propTypes = {
  id: PropTypes.string.isRequired,
  viewOnly: PropTypes.bool.isRequired,
};
