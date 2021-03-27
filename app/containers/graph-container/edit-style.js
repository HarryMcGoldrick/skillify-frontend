// Note styles are applied from top to bottom

const style = [
  {
    selector: 'node[type = "ROOT"]',
    style: {
      content: 'data(label)',
      'border-width': '2',
      'border-color': 'green',
    },
  },
  {
    selector: '.completed',
    style: {
      'background-color': 'red',
    },
  },
  {
    selector: '.locked',
    style: {
      'background-blacken': 0.7,
    },
  },
  {
    selector: '.unlocked',
    style: {
      'background-blacken': 0.3,
    },
  },
  {
    selector: 'node[label]',
    style: {
      content: 'data(label)',
    },
  },
  {
    selector: 'edge',
    style: {
      width: 3,
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle',
    },
  },
  {
    selector: '.eh-handle',
    style: {
      'background-color': 'red',
      width: 12,
      height: 12,
      shape: 'ellipse',
      'overlay-opacity': 0,
      'border-width': 12, // makes the handle easier to hit
      'border-opacity': 0,
    },
  },

  {
    selector: '.eh-hover',
    style: {
      'background-color': 'red',
    },
  },

  {
    selector: '.eh-source',
    style: {
      'border-width': 2,
      'border-color': 'red',
    },
  },

  {
    selector: '.eh-target',
    style: {
      'border-width': 2,
      'border-color': 'red',
    },
  },

  {
    selector: '.eh-preview, .eh-ghost-edge',
    style: {
      'background-color': 'red',
      'line-color': 'red',
      'target-arrow-color': 'red',
      'source-arrow-color': 'red',
    },
  },

  {
    selector: '.eh-ghost-edge.eh-preview-active',
    style: {
      opacity: 0,
    },
  },
  {
    selector: ':selected',
    style: {
      'border-width': '2',
      'border-color': 'black',
    },
  },
];

export default style;
