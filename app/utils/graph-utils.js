import { nodeType } from '../enums/nodeTypes';
import {
  addToCompleted, addToLocked, addToUnlocked, getNodesFromElementCollection,
} from './node-utils';

export const getNodeWithId = (cy, id) => cy.elements(`node[id = "${id}"]`)[0];

export const getSelectedNode = (cy) => cy.nodes(':selected');

export const getConnectedNodes = (cy, node) => {
  const neighbor = node.outgoers('node');
  return getNodesFromElementCollection(neighbor);
};

export const updateProgressModeNodeClasses = (cy, completedNodes, updateNodeFunc) => {
  // naive approach
  // all nodes -> if complete pass -> if connected node is complete -> unlocked -> if no complete nodes connected -> locked
  const nodes = getNodesFromElementCollection(cy.nodes());
  for (const u of cy.nodes()) {
    const neighbor = u.outgoers();
    for (const v of neighbor) {
      const isUnlocked = u.classes().includes('completed') && !(v.classes().includes('completed'));
      const isLocked = !(u.classes().includes('completed')) && !(v.classes().includes('completed'));

      if (isUnlocked) {
        updateNodeFunc(addToUnlocked(v.data()));
        v.addClass('unlocked');
      } else if (isLocked) {
        updateNodeFunc(addToLocked(v.data()));
        v.addClass('locked');
      }
    }
  }

  // nodes.forEach((node) => {
  //   const dfs = cy.elements().dfs({
  //     roots: getNodeWithId(cy, node.id),
  //     visit: (v, e, u, i, depth) => {
  //       if (depth === 3) {
  //         return false;
  //       }
  //       console.log(v.data());

  //       // from start node -> get connected nodes -> if connected nodes have

  //       if (u) {
  //         const isUnlocked = u.classes().includes('completed') && !(v.classes().includes('completed'));
  //         const isLocked = !(u.classes().includes('completed')) && !(v.classes().includes('completed'));

  //         if (u.classes().includes('completed')) {
  //           updateNodeFunc(addToCompleted(e.data()));
  //         }

  //         if (isUnlocked) {
  //           updateNodeFunc(addToUnlocked(e.data()));
  //           updateNodeFunc(addToUnlocked(v.data()));
  //           v.addClass('unlocked');
  //         } else if (isLocked) {
  //           updateNodeFunc(addToLocked(e.data()));
  //           updateNodeFunc(addToLocked(v.data()));
  //           v.addClass('locked');
  //         }
  //       }
  //     },
  //     directed: true,
  //   });
  // });

  // Unlocked

  // Locked
};
