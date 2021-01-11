import {
  Button,
  Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../services/user-service';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
  },
  media: {
    height: 200,
  },
}));

const GraphCard = (props) => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({});
  const { graph } = props;
  const {
    name, description, createdById: userId, image,
  } = graph;

  useEffect(() => {
    if (userId) {
      getUserInfo(userId).then((res) => {
        setUserInfo(res);
      });
    }
  }, []);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          image={image || 'no image found'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default GraphCard;
