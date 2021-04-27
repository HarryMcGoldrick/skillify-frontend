import { makeStyles } from '@material-ui/core';
import React from 'react';
import { NodeCard } from '../..';
import { checkIsNode } from '../../../utils/node-utils';

const useStyles = makeStyles({
  nodeList: {
    padding: 0,
  },

});

/*
  Displays a list of NodeCards from an array of elements
*/

function NodeList(props) {
  const classes = useStyles();

  const { progressMode, elements, isNodeData } = props;
  return (
    <ul className={classes.nodeList}>
      {elements.map((ele) => {
        if (isNodeData) {
          return <NodeCard node={{ data: ele }} key={ele.id} />;
        }
        if (checkIsNode(ele)) {
          if (progressMode && ele.classes === 'unlocked') {
            return <NodeCard node={ele} key={ele.data.id} />;
          }
          if (!progressMode) {
            return <NodeCard node={ele} key={ele.data.id} />;
          }
        }

        return null;
      })}
    </ul>
  );
}

export default NodeList;
