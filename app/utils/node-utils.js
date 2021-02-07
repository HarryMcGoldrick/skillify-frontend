export const updateNodeData = (node, data) => {
  Object.entries(data).forEach((entry) => {
    const [key, value] = entry;
    node.data(key, value);
  });
};

export const addToCompleted = (node) => {
  node.addClass('completed');
};

export const removeFromCompleted = (node) => {
  node.removeClass('completed');
};
