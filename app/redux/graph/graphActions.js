import {
  ADD_NODE, REMOVE_NODE, SELECT_NODE, TOGGLE_GRAPH_DETAILS, UPDATE_ELEMENTS,
} from './graphTypes';

export const selectNode = (node) => ({
  type: SELECT_NODE,
  payload: node,
});

export const addNode = (pos) => {
  const newNode = {
    data: {},
    position: pos,
  };
  return {
    type: ADD_NODE,
    payload: newNode,
  };
};

export const removeNode = (id) => ({
  type: REMOVE_NODE,
  payload: id,
});

export const updateElements = (elements) => ({
  type: UPDATE_ELEMENTS,
  payload: elements,
});

export const toggleGraphDetails = () => ({
  type: TOGGLE_GRAPH_DETAILS,
});
