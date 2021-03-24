import {
  Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../../services/user-service';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '600px',
    height: '100%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '100%',
    height: '150px',
  },
}));

const GraphCard = (props) => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({});
  const { graph } = props;
  const {
    name, description, createdById: userId, image,
  } = graph;

  // useEffect(() => {
  //   if (userId) {
  //     getUserInfo(userId).then((res) => {
  //       setUserInfo(res);
  //     });
  //   }
  // }, [userId]);

  function truncateString(phrase, length) {
    if (phrase.length < length) return phrase;

    let trimmed = phrase.slice(0, length);
    trimmed = trimmed.slice(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')));
    return `${trimmed}…`;
  }

  return (
    <div>
      {name && (
        <Card className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h6" variant="h6">
                {truncateString(name, 50)}
              </Typography>
              <Typography component="i" variant="subtitle2">
                {description}
              </Typography>
              {/* <Typography variant="subtitle2" color="textSecondary" component="p" style={{marginTop: '16px'}}>
                Created by:
                {' '}
                {userInfo.username}
              </Typography> */}

            </CardContent>
          </div>
          <CardMedia
            className={classes.cover}
            image={image || 'no image found'}
          />
        </Card>
      )}
    </div>
  );
};

export default GraphCard;
