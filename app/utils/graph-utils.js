export const getNodeWithId = (cy, id) => cy.elements(`node[id = "${id}"]`)[0];

export const getSelectedNode = (cy) => cy.nodes(':selected');
