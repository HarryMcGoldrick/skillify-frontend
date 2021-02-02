import { loadGraphElements } from '../../services/graph-service';
import { FETCH_GRAPH_REQUEST, FETCH_GRAPH_SUCCESS, FETCH_GRAPH_FAILURE } from './graphTypes';

export const fetchGraphRequest = () => ({
  type: FETCH_GRAPH_REQUEST,
});

export const fetchGraphSuccess = (data) => ({
  type: FETCH_GRAPH_SUCCESS,
  payload: {
    elements: [...data.graph.nodes, ...data.graph.edges],
    graphData: { name: data.graph.name, description: data.graph.description },
  },
});

export const fetchGraphFailure = (error) => ({
  type: FETCH_GRAPH_FAILURE,
  payload: error,
});

export const fetchGraphData = (id) => (dispatch) => {
  dispatch(fetchGraphRequest());
  loadGraphElements(id).then((response) => {
    dispatch(fetchGraphSuccess(response));
  }).catch((error) => {
    dispatch(fetchGraphFailure(error.message));
  });
};
