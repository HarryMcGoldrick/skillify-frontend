import { nodeType } from '../enums/nodeTypes';

export const updateNodeData = (node, data) => {
  Object.entries(data).forEach((entry) => {
    const [key, value] = entry;
    node.data(key, value);
  });
};

export const addToCompleted = (node) => ({
  ...node,
  classes: 'completed',
});

export const addToIncompleted = (node) => ({
  ...node,
  classes: 'incomplete',
});

export const addToUnlocked = (node) => ({
  ...node,
  classes: 'unlocked',
});

export const addToLocked = (node) => ({
  ...node,
  classes: 'locked',
});

export const removeProperty = (objToRemoveFrom, property) => Object.keys(objToRemoveFrom).reduce((object, key) => {
  if (key !== property) {
    object[key] = objToRemoveFrom[key];
  }
  return object;
}, {});

export const findNodeInElements = (elements, nodeId) => {
  const node = elements.filter((element) => {
    if (element.data.id === nodeId) {
      return element;
    }
  }).pop();
  return node;
};

export const updateCompletedNodes = (elements, completedNodeIds) => {
  const updatedElements = elements.map((ele) => {
    if (completedNodeIds.includes(ele.data.id)) {
      return addToCompleted(ele);
    }
    return ele;
  });
  return updatedElements;
};

export const checkIsNode = (element) => {
  if (element.data) {
    if (!element.data.source) {
      return true;
    }
    return false;
  }
  return false;
};

export const removeItemFromArray = (array, item) => array.filter((f) => f !== item);

// ******************** Cytoscape helper methods ********************
// only to used when having access to cy

export const checkValidDeleteTarget = (cy, nodeData) => {
  if (nodeData.type === nodeType.ROOT) {
    const rootedNodes = cy.elements(`node[type = "${nodeType.ROOT}"]`);
    if (rootedNodes.length > 1) {
      return true;
    }
    return { error: 'Map needs to have 1 start node.' };
  }
  return true;
};

export const checkValidAddTarget = (cy, type) => {
  if (type === nodeType.ROOT) {
    const rootedNodes = cy.elements(`node[type = "${nodeType.ROOT}"]`);
    if (rootedNodes.length >= 1) {
      return { error: 'Map may only have 1 start node' };
    }
    return true;
  }
  return true;
};

// Return node element with a given Id
export const getNodeWithId = (cy, id) => cy.elements(`node[id = "${id}"]`)[0];

export const getStartNode = (cy) => cy.elements('node[type = "ROOT"]')[0];

// Given a collection of elements returns an array of node data
export const getNodesFromElementCollection = (nodes) => {
  const nodeArray = [];
  for (const node of nodes) {
    if (checkIsNode(node)) nodeArray.push(node.data());
  }
  return nodeArray;
};

export const cytoscapeAstar = (cy, startNode, targetNode) => {
  const aStar = cy.elements().aStar({
    root: startNode,
    goal: targetNode,
    directed: true,
  });
  return aStar;
};
