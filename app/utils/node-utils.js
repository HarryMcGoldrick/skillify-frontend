export const GetNodeWithId = (cy, id) => cy.elements(`node[id = "${id}"]`)[0];

export const GetSelectedNode = (cy) => cy.nodes(':selected');
