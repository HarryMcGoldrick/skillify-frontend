import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './graph.css';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import edgehandles from 'cytoscape-edgehandles';
import { Drawer, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import dagre from 'cytoscape-dagre';
import automove from 'cytoscape-automove';
import { loadGraphElements, addGraphToGraphProgress } from '../../services/graph-service';
import edgeHandleStyle from './styles';
import GraphDetails from '../graph-details/graph-details';
import GraphToolbar from '../graph-toolbar/graph-toolbar';
import NodeDrawerPanel from '../node-drawer-panel/node-drawer-panel';
import { isAuthenticated, getUserId } from '../../utils/authentication';
import { getUserProgressInfo } from '../../services/user-service';

export default class Graph extends Component {
  constructor() {
    super();
    this.state = {
      elements: [],
      selectedNode: {},
      drawerOpen: false,
      completedNodes: [],
      progressMode: false,
      graphId: '',
    };
  }

  componentDidMount = () => {
    const { id, viewOnly } = this.props;
    this.setState({ graphId: id });
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

    // If user is logged in check if this graph exists in the users progress info
    if (isAuthenticated() && viewOnly) {
      const userId = getUserId();
      getUserProgressInfo(userId).then((res) => {
        const { id: graphId } = this.props;
        const { graphs_progressing: graphs } = res;
        graphs.filter((graph) => {
          if (graph._id === graphId) {
            this.setState({ completedNodes: graph.completedNodes, progressMode: true });
            this.initProgressMode();
          }
          return null;
        });
      });
    }
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

  initProgressMode = async () => {
    // Mark each node as completed
    this.setState({ progressMode: true });

    const { completedNodes } = this.state;

    const nodesInMap = this.cy.nodes().values();
    const nodeArray = Array.from(nodesInMap);

    nodeArray.forEach((node) => {
      const nodeData = node.data();
      if (completedNodes.includes(nodeData.id)) {
        node.style('background-color', 'red');
      }
    });
  }

  addGraphToProgress = async () => {
    const { graphId } = this.state;
    const initGraph = await addGraphToGraphProgress(graphId, getUserId());
    if (initGraph.res) {
      this.initProgressMode();
    }
  }

  toggleDrawer = () => {
    const { drawerOpen } = this.state;
    this.setState({ drawerOpen: !drawerOpen });
  }

  render() {
    const {
      elements, selectedNode, graphName, drawerOpen, graphDescription, completedNodes, progressMode, graphId,
    } = this.state;

    const { viewOnly } = this.props;
    const isSelectedNodeComplete = Boolean(completedNodes.includes(selectedNode.id));

    return (
      <Grid container justify="center">

        <Grid item>
          <Drawer anchor="left" open={drawerOpen} variant="persistent">
            <GraphDetails
              graphName={graphName}
              graphDescription={graphDescription}
              viewOnly={viewOnly}
              addGraphToProgress={this.addGraphToProgress}
              progressMode={progressMode}
            />
          </Drawer>
        </Grid>

        {this.cy && (
        <Grid item>
          <Drawer
            anchor="right"
            open={Boolean(selectedNode.id)}
            variant="persistent"
          >
            <NodeDrawerPanel nodeData={selectedNode} cy={this.cy} progressMode={progressMode} isNodeComplete={isSelectedNodeComplete} viewOnly={viewOnly} />
          </Drawer>
        </Grid>
        )}

        {/* Inline style has to be used here unfortunately */}
        <Grid item className={drawerOpen ? 'drawer-open' : 'drawer-close'} style={drawerOpen ? { marginLeft: '740px' } : {}}>
          <Grid item className={selectedNode.id ? 'node-drawer-open' : 'node-drawer-close'} style={selectedNode.id ? { marginRight: '481px' } : {}}>
            {this.cy && (
            <GraphToolbar
              viewOnly={viewOnly}
              graphId={graphId}
              selectNode={this.selectNode}
              toggleDrawer={this.toggleDrawer}
              cy={this.cy}
            />
            )}

            <CytoscapeComponent
              className="graph"
              elements={elements}
              cy={(cy) => {
                this.cy = cy;
              }}
            />
          </Grid>
        </Grid>
      </Grid>

    );
  }
}

Graph.propTypes = {
  id: PropTypes.string.isRequired,
  viewOnly: PropTypes.bool.isRequired,
};
