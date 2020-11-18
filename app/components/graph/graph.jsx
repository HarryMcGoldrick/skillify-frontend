import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './graph.css';
import dummyElements from './elements';

export default class Graph extends Component {
  constructor() {
    super();
    this.state = {
      elements: [],
    };
  }

    componentDidMount = () => {
      this.setState({
        elements: dummyElements,
      });
      this.cy.resize();
      this.cy.fit();
    };

    render() {
      const { elements } = this.state;
      return (
        <CytoscapeComponent
          className="graph"
          elements={elements}
          style={{ background: 'black' }}
          cy={(cy) => {
            this.cy = cy;
          }}
        />
      );
    }
}
