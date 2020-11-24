import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './graph.css';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import { Button, Grid, TextField } from '@material-ui/core';
import { loadGraphElements, saveGraphElements } from '../../services/graph-service';
import extractDiagramDataFromGraphData from '../../utils/graph-utils';
import edgeHandleStyle from './styles';

export default class Graph extends Component {
  constructor() {
    super();
    this.state = {
      elements: [],
      selectedNode: {},
    };
  }

  componentDidMount = () => {
    loadGraphElements('5fb7fceabf6a047001b14ae4').then((data) => {
      const cytoscapeData = [...data.graph.nodes, ...data.graph.edges];
      this.setState({
        elements: cytoscapeData,
      });
    });
    this.enableEditing();
  };

  saveData = () => {
    saveGraphElements(extractDiagramDataFromGraphData(this.cy.json()));
  };

  enableEditing = () => {
    cytoscape.use(edgehandles);
    this.cy.style(edgeHandleStyle);
    const edgehandler = this.cy.edgehandles();
    edgehandler.disableDrawMode();

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
    this.cy.on('click', 'node', (event) => {
      // Prevent edgehandle from triggering this event
      if (event.target.classes()[0] === 'eh-handle') {
        return;
      }
      const currentNode = event.target.data();
      this.setState({ selectedNode: { ...currentNode } });
    });
  }

  updateSelectedNode = () => {
    const { selectedNode } = this.state;
    const { id, label } = selectedNode;
    const node = this.cy.elements(`node[id = "${id}"]`)[0];
    if (node) {
      node.data('label', label);
    }
  }

  render() {
    const { elements, selectedNode } = this.state;
    const { label, id } = selectedNode;

    return (
      <Grid container style={{ minHeight: '100vh' }}>
        <Grid item xs={3}>
          <h1>
            Node Data:
            {id}
          </h1>
          <form onSubmit={(event) => {
            event.preventDefault();
            this.updateSelectedNode();
          }}
          >
            <TextField name="nodeLabel" variant="outlined" value={label || ''} onChange={(e) => this.setState({ selectedNode: { label: e.target.value, id } })} />
            <Button type="submit">Submit</Button>
          </form>
        </Grid>

        <Grid item xs={9}>
          <button type="button" onClick={this.saveData}>SaveData</button>
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
