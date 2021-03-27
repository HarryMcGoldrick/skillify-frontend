import { nodeType } from '../enums/nodeTypes';
import { addToUnlocked, getNodesFromElementCollection } from './node-utils';

export const getNodeWithId = (cy, id) => cy.elements(`node[id = "${id}"]`)[0];

export const getSelectedNode = (cy) => cy.nodes(':selected');

export const updateProgressModeNodeClasses = (cy, completedNodes, updateNodeFunc) => {
  // naive approach
  // all nodes -> if complete pass -> if connected node is complete -> unlocked -> if no complete nodes connected -> locked
  const nodes = getNodesFromElementCollection(cy.nodes());
  console.log(nodes);
  nodes.forEach((node) => {
    const dfs = cy.elements().dfs({
      roots: getNodeWithId(cy, node.id),
      visit: (v, e, u, i, depth) => {
        if (depth == 2) {
          return false;
        }
        console.log(v);

        if (u) {
          const isUnlocked = u.classes().includes('completed') && !(v.classes().includes('completed'));
          const isLocked = !(u.classes().includes('completed')) && !(v.classes().includes('completed'));

          if (isUnlocked) {
            console.log(`unlocked node${v.data('label')}`);
            updateNodeFunc(addToUnlocked(v.data()));
            v.addClass('unlocked');
          } else if (isLocked) {
            console.log(`locked node${v.data('label')}`);
            updateNodeFunc(addToUnlocked(v.data()));
            v.addClass('locked');
          }
        }
      },
      directed: true,
    });
  });

  // Unlocked

  // Locked
};
