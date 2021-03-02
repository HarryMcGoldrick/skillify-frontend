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

// only to used when having access to cy
export const getNodeWithId = (cy, id) => cy.elements(`node[id = "${id}"]`)[0];