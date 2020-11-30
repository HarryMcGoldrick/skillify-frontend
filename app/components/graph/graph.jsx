import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './graph.css';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { loadGraphElements, updateGraphElements } from '../../services/graph-service';
import { extractDiagramDataFromGraphData } from '../../utils/graph-data';
import edgeHandleStyle from './styles';
import { tools } from '../../enums/tools';
import GraphDetails from '../graph-details';
import { getYoutubeVideoForNode } from '../../services/content-service';

export default class Graph extends Component {
  constructor() {
    super();
    this.state = {
      elements: [],
      selectedNode: {},
    };
  }

  componentDidMount = () => {
    const { id } = this.props;

    loadGraphElements(id).then((data) => {
      const graphName = data.graph.name;
      const cytoscapeData = [...data.graph.nodes, ...data.graph.edges];
      this.setState({
        elements: cytoscapeData,
        graphName,
      });
    });
    this.enableEditing();
    this.switchTool(tools.SELECT);
  };

  updateData = () => {
    const { id } = this.props;
    updateGraphElements(id, extractDiagramDataFromGraphData(this.cy.json()));
  }

  getYoutubeContentForNode = (label) => {
    getYoutubeVideoForNode(label).then((data) => {
      this.setState({ youtubeNodeData: data.response.items[0] });
    });
  }

  enableEditing = () => {
    if (!this.cy.edgehandles) {
      cytoscape.use(edgehandles);
      this.cy.style(edgeHandleStyle);
      const edgehandler = this.cy.edgehandles();
      edgehandler.disableDrawMode();
    }
  }

  updateSelectedNode = (data) => {
    const { selectedNode } = this.state;
    const { id } = selectedNode;
    const node = this.cy.elements(`node[id = "${id}"]`)[0];
    if (node) {
      node.data('label', data.nodeLabel);
    }
  }

  removeListeners = () => {
    this.cy.removeListener('tap');
    this.cy.removeListener('click');
  }

  selectNodeTool = () => {
    this.cy.on('click', 'node', (event) => {
      // Prevent edgehandle from being selected
      if (event.target.classes()[0] === 'eh-handle') {
        return;
      }
      const currentNode = event.target.data();
      this.setState({ selectedNode: { ...currentNode } });
      this.getYoutubeContentForNode(currentNode.label);
    });
  }

  addNodeTool = () => {
    this.cy.on('tap', (event) => {
      if (event.target === this.cy) {
        const { x, y } = event.position;
        this.cy.add({
          group: 'nodes',
          position: { x, y },
          data: { label: 'test' },
        });
      }
    });
  }

  deleteNodeAndEdgeTool = () => {
    this.cy.on('tap', (event) => {
      if (event.target !== this.cy) {
        this.cy.remove(event.target);
      }
    });
  }

  switchTool = (tool) => {
    // Remove previous tools
    this.removeListeners();

    switch (tool) {
      case tools.SELECT:
        this.selectNodeTool();
        break;
      case tools.ADD:
        this.addNodeTool();
        break;
      case tools.DELETE:
        this.deleteNodeAndEdgeTool();
        break;
      default:
        break;
    }
  }

  render() {
    const {
      elements, selectedNode, graphName, youtubeNodeData,
    } = this.state;

    const { viewOnly } = this.props;

    return (
      <Grid container style={{ minHeight: '100vh' }}>
        <Grid item xs={3}>
          <GraphDetails
            graphName={graphName}
            selectedNode={selectedNode}
            updateSelectedNode={this.updateSelectedNode}
            youtubeContentData={youtubeNodeData}
            viewOnly={viewOnly}
          />
        </Grid>

        <Grid item xs={9}>
          {!viewOnly && (
          <div>
            <button type="button" onClick={this.updateData}>Save</button>
            <button type="button" onClick={() => this.switchTool(tools.SELECT)}>Select</button>
            <button type="button" onClick={() => this.switchTool(tools.ADD)}>Add</button>
            <button type="button" onClick={() => this.switchTool(tools.DELETE)}>Delete</button>
          </div>
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
    );
  }
}

Graph.propTypes = {
  id: PropTypes.string.isRequired,
  viewOnly: PropTypes.bool.isRequired,
};
