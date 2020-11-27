// Prepares data to be sent to the API
// eslint-disable-next-line import/prefer-default-export
export const extractDiagramDataFromGraphData = (graphData) => {
  const edges = [];
  const nodes = [];
  if (!graphData) return {};
  if (graphData.elements) {
    if (graphData.elements.edges) {
      edges.push(graphData.elements.edges.map((res) => {
        const { data, position } = res;
        return { data, position };
      }));
    }
    if (graphData.elements.nodes) {
      nodes.push(graphData.elements.nodes.filter((res) => {
        // Fixes a bug where the handle was being added to the map data
        if (res.classes === 'eh-handle') {
          return null;
        }
        const { data, position } = res;
        return { data, position };
      }));
    }
  }
  return { edges: edges[0], nodes: nodes[0] };
};
