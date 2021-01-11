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
          <Typography variant="subtitle1" color="textSecondary" component="p">
            {description}
            <span style={{ float: 'right' }}>
              <Typography variant="subtitle2" color="textSecondary" component="span">
                Created by:
                {' '}
                {userInfo.username}
              </Typography>
            </span>
          </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GraphCard;
