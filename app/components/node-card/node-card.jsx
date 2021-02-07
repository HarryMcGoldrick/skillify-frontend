import {
  Card, CardActionArea, CardContent, makeStyles, Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    width: 400,
  },
});

const NodeCard = (props) => {
  const classes = useStyles();
  const { nodeData } = props;
  const { label, description } = nodeData;

  return (
    <Card className={classes.root}>
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
