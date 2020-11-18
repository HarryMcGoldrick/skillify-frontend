import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

export default class Graph extends Component {
  constructor() {
    super();
    this.state = {
      w: 0,
      h: 0,
      elements: [],
    };
  }

    componentDidMount = () => {
      this.setState({
        w: window.innerWidth,
        h: window.innerHeight,
        elements: [
          {
            data: {
              id: '1',
              label: 'Node: 1',
              secret: 'wowzers',
            },
            position: { x: 300, y: 400 },
          },
          {
            data: {
              id: '2',
              label: 'Node: 2',
            },
            position: { x: 45, y: 300 },
          },
          {
            data: {
              source: 1,
              target: 2,
            },
          },
        ],
      });
    };

    render() {
      const { elements, w, h } = this.state;
      return (
        <>
          <div>
            <CytoscapeComponent
              elements={elements}
              style={{ width: w, height: h }}
              cy={(cy) => {
                this.cy = cy;
              }}
            />
          </div>
        </>
      );
    }
}
