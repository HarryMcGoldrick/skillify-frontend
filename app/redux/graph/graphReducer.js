import { findNodeInElements, addToCompleted, updateCompletedNodes, removeItemFromArray, removeProperty, addToIncompleted } from '../../utils/node-utils';
import {
  ADD_NODE, ADD_COMPLETED_NODE, FETCH_GRAPH_SUCCESS, REMOVE_NODE, SELECT_NODE, UPDATE_ELEMENTS, TOGGLE_GRAPH_DETAILS, FETCH_COMPLETED_NODES_SUCCESS, UPDATE_PROGRESS_MODE, REMOVE_COMPLETED_NODE, UPDATE_NODE,
} from './graphTypes';
import { initialState } from './initialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_NODE: {
      return {
        ...state,
        selectedNode: action.payload,
      };
    }
    case ADD_NODE: {
      return {
        ...state,
        elements: [
          ...state.elements,
          action.payload,
        ],
      };
    }
    case REMOVE_NODE: {
      const elements = state.elements.filter((ele) => ele.data.id !== action.payload && ele.data.source !== action.payload && ele.data.target !== action.payload);
      return {
        ...state,
        elements: [
          ...elements,
        ],
      };
    }
    case UPDATE_NODE : {
      const elements = state.elements.filter((ele) => ele.data.id !== action.payload.id);
      const newNode = {
        data: {
          ...action.payload
        }
      }
      return {
        ...state,
        elements: [
          ...elements,
          newNode
        ],
      }
    }
    case UPDATE_ELEMENTS: {
      return {
        ...state,
        elements: [...action.payload],
      };
    }
    case FETCH_GRAPH_SUCCESS: {
      return {
        ...state,
        elements: action.payload.elements,
        graphData: action.payload.graphData,
      };
    }
    case ADD_COMPLETED_NODE: {
      const node = findNodeInElements(state.elements, action.payload)
      const newElements = state.elements.filter((ele) => ele.data.id !== action.payload);
      const completedNode = addToCompleted(node);

      return {
        ...state,
        elements: [
          ...newElements,
          completedNode
        ],
        completedNodes: [
          ...state.completedNodes,
          action.payload,
        ],
      };
    }
    case REMOVE_COMPLETED_NODE: {
      const newElements = state.elements.map((ele) => {
        if (ele.data.id === action.payload) {
          return addToIncompleted(ele);
        } else {
          return ele;
        }
      });
      const updatedCompletedNodes = removeItemFromArray(state.completedNodes, action.payload)

      return {
        ...state,
        elements: [
          ...newElements,
        ],
        completedNodes: [
          ...updatedCompletedNodes
        ],
      };
    }
    case FETCH_COMPLETED_NODES_SUCCESS: {
      const updatedElements = updateCompletedNodes(state.elements, action.payload.completedNodes)
      return {
        ...state,
        elements: [...updatedElements],
        completedNodes: [
          ...state.completedNodes,
          ...action.payload.completedNodes,
        ],
      };
    }
    case TOGGLE_GRAPH_DETAILS: {
      return {
        ...state,
        showGraphDetails: !state.showGraphDetails,
      };
    }
    case UPDATE_PROGRESS_MODE: {
      return {
        ...state,
        progressMode: action.payload,
      };
    }
    default: return state;
  }
};

export default reducer;
