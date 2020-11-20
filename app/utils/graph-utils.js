export default function extractDiagramDataFromGraphData(graphData) {
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
      nodes.push(graphData.elements.nodes.map((res) => {
        const { data, position } = res;
        return { data, position };
      }));
    }
  }
  return { edges, nodes };
}
