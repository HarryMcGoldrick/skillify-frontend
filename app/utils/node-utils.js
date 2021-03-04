import { node } from "prop-types";

export const updateNodeData = (node, data) => {
  Object.entries(data).forEach((entry) => {
    const [key, value] = entry;
    node.data(key, value);
  });
};

export const addToCompleted = (node) => {
  return {
    ...node,
    classes: 'completed'
  }
};

export const addToIncompleted = (node) => {
  return {
    ...node,
    classes: 'incomplete'
  }
};


export const removeProperty = (objToRemoveFrom, property) => {
  return Object.keys(objToRemoveFrom).reduce((object, key) => {
    if (key !== property) {
      object[key] = objToRemoveFrom[key]
    }
    return object
  }, {})
}

export const findNodeInElements = (elements, nodeId) => {
  const node = elements.filter((element) => {
    if (element.data.id === nodeId) {
      return element;
    }
  }).pop();
  return node;
}


export const updateCompletedNodes = (elements, completedNodeIds) => {
  const updatedElements = elements.map((ele) => {
    if (completedNodeIds.includes(ele.data.id)) {
      return addToCompleted(ele);
    } else {
      return ele;
    }
  })
  return updatedElements;
}

export const checkIsNode = (element) => {
  if (!element.source) {
    return true;
  } else {
    return false;
  }
}

export const removeItemFromArray = (array, item) => array.filter((f) => f !== item);

// ******************** Cytoscape helper methods ********************
// only to used when having access to cy

// Return node element with a given Id
export const getNodeWithId = (cy, id) => cy.elements(`node[id = "${id}"]`)[0];

// Given a collection of elements returns an array of node data
export const getNodesFromElementCollection = (nodes) => {
  let nodeArray = [];
  for (let node of nodes) {
    if(checkIsNode(node.data())) nodeArray.push(node.data());
  }
  return nodeArray;
}

export const cytoscapeBreadthFirstSearch = (cy, startNode, targetNode) => {
  const bfs = cy.elements().dfs({
    roots: startNode,
    visit: (v, e, u, i, depth) => {
      console.log( 'visit ' + v.data('label') );
      if(v.data('id') === targetNode.data('id')) {
        return false
      }
    },
    directed: true
  })
  console.log(bfs.path);
  console.log(bfs.found);
}

export const cytoscapeAstar = (cy, startNode, targetNode) => {
  const aStar = cy.elements().aStar({
    root: startNode,
    goal: targetNode,
    directed: true
  })
  return aStar;
}