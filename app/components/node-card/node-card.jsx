import {
  Card, CardActionArea, CardContent, makeStyles, Typography,
} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectNode } from '../../redux/graph/graphActions';

const useStyles = makeStyles({
  root: {
    width: 350,
    margin: 0
  },
});

const NodeCard = (props) => {
  const classes = useStyles();
  const { node } = props;
  const { data: nodeData} = node;
  const { label, description } = nodeData;
  const dispatch = useDispatch()

  return (
    <Card className={classes.root} onClick={() => dispatch(selectNode(node))}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {label}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NodeCard;
