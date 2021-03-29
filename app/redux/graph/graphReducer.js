import {
  findNodeInElements, addToCompleted, updateCompletedNodes, removeItemFromArray, addToIncompleted,
} from '../../utils/node-utils';
import {
  ADD_NODE, ADD_COMPLETED_NODE, FETCH_GRAPH_SUCCESS, REMOVE_NODE, SELECT_NODE, ADD_STYLE,
  UPDATE_ELEMENTS, TOGGLE_GRAPH_DETAILS, FETCH_COMPLETED_NODES_SUCCESS, UPDATE_PROGRESS_MODE,
  REMOVE_COMPLETED_NODE, UPDATE_NODE, UPDATE_STYLE_SHEET, UPDATE_SELECTED_NODE_PATH, UPDATE_CONNECTED_NODES,
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
    case UPDATE_NODE: {
      let node;
      const elements = state.elements.filter((ele) => {
        if (ele.data.id === action.payload.data.id) {
          node = ele;
        }
        return ele.data.id !== action.payload.data.id;
      });
      const newNode = {
        data: {
          ...action.payload.data,
        },
        classes: action.payload.classes,
        position: node.position,
      };
      return {
        ...state,
        elements: [
          ...elements,
          newNode,
        ],
      };
    }
    case UPDATE_SELECTED_NODE_PATH: {
      return {
        ...state,
        selectedNodePath: action.payload,
      };
    }
    case ADD_STYLE: {
      const newStyleSheet = state.styleSheet.filter((style) => style.selector.toString() !== action.payload.selector.toString());
      return {
        ...state,
        styleSheet: [
          action.payload,
          ...newStyleSheet,
        ],
      };
    }
    case UPDATE_STYLE_SHEET: {
      return {
        ...state,
        styleSheet: action.payload,
      };
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
      const node = findNodeInElements(state.elements, action.payload);
      const newElements = state.elements.filter((ele) => ele.data.id !== action.payload);
      const completedNode = addToCompleted(node.data);

      return {
        ...state,
        elements: [
          ...newElements,
          completedNode,
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
          return addToIncompleted(ele.data);
        }
        return ele;
      });
      const updatedCompletedNodes = removeItemFromArray(state.completedNodes, action.payload);

      return {
        ...state,
        elements: [
          ...newElements,
        ],
        completedNodes: [
          ...updatedCompletedNodes,
        ],
      };
    }
    case FETCH_COMPLETED_NODES_SUCCESS: {
      const updatedElements = updateCompletedNodes(state.elements, action.payload.completedNodes);
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
    case UPDATE_CONNECTED_NODES: {
      return {
        ...state,
        connectedNodes: action.payload,
      };
    }
    default: return state;
  }
};

export default reducer;
