import {
  Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography,
} from '@material-ui/core';
import { Delete, ThumbUp } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserInfo, updateLikedGraph } from '../../../services/user-service';
import { getUserId, isAuthenticated } from '../../../utils/authentication';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '740px',
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
  const [graphScore, setGraphScore] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { graph, likedGraphs } = props;
  const {
    name, description, createdById: userId, image, score, id: graphId,
  } = graph;

  useEffect(() => {
    if (userId) {
      getUserInfo(userId).then((res) => {
        setUserInfo(res);
      });
    }
    if (isAuthenticated()) {
      if (likedGraphs && likedGraphs.includes(graphId)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [userId]);

  useEffect(() => {
    setGraphScore(score);
  }, [props]);

  const truncateString = (phrase, length) => {
    if (phrase.length < length) return phrase;

    let trimmed = phrase.slice(0, length);
    trimmed = trimmed.slice(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')));
    return `${trimmed}…`;
  };

  const handleLike = () => {
    if (isAuthenticated()) {
      updateLikedGraph(getUserId(), graphId).then((data) => {
        if (data && data.type === 'remove') {
          setGraphScore(graphScore - 1);
          setIsLiked(false);
        } else if (data && data.type === 'add') {
          setGraphScore(graphScore + 1);
          setIsLiked(true);
        }
      });
    }
  };

  return (
    <div>
      {name && (
        <Card className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Link to={`/edit/${graphId}`} style={{ textDecoration: 'none' }}>
                <Typography component="h6" variant="h6">
                  {truncateString(name, 50)}
                </Typography>
                <Typography component="i" variant="subtitle2">
                  {description}
                </Typography>
              </Link>
              <CardActions className={classes.controls}>
                <Typography component="h6" variant="h6">
                  {graphScore || 0}
                  {isAuthenticated() && (
                  <span>
                    <IconButton onClick={handleLike} color={isLiked ? 'primary' : 'default'}>
                      <ThumbUp />
                    </IconButton>
                  </span>
                  )}
                </Typography>
              </CardActions>
              <Typography variant="subtitle2" color="textSecondary" component="p" style={{ marginTop: '16px' }}>
                Created by:
                {' '}
                {userInfo.username}
              </Typography>

            </CardContent>
          </div>
          <CardActionArea>
            <Link to={`/edit/${graphId}`}>
              <CardMedia
                className={classes.cover}
                image={image || 'no image found'}
              />
            </Link>
          </CardActionArea>
        </Card>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  likedGraphs: state.user.likedGraphs,
});

export default connect(mapStateToProps)(GraphCard);
