import {
  Card, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography,
} from '@material-ui/core';
import { Delete, ThumbUp } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import image from '../../../assets/placeholder.png';
import contentType from '../../../enums/content-type';
import { getDataFromGoogleBooksId, getDataFromYoutubeId } from '../../../services/content-service';
import { updateLikedContent } from '../../../services/user-service';
import { getUserId, isAuthenticated } from '../../../utils/authentication';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '100%',
  },
  controls: {
    marginLeft: '8px',
  },

}));

/*
  Displays an appropriate content card using the externalID provided
*/
function NodeContentCard(props) {
  const classes = useStyles();
  const {
    contentData, likedContent, handleDelete, viewOnly,
  } = props;
  const {
    type, externalId, score, _id: contentId,
  } = contentData;
  const [title, setTitle] = useState();
  const [thumbnailUrl, setThumbnailUrl] = useState();
  const [navUrl, setNavUrl] = useState();
  const [author, setAuthor] = useState();
  const [contentScore, setContentScore] = useState();
  const [isLiked, setIsLiked] = useState();

  useEffect(() => {
    // Update current like status
    if (isAuthenticated()) {
      if (likedContent && likedContent.includes(contentId)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
    // Update the card information and thumbnail for each content type
    if (type === contentType.YOUTUBE) {
      getDataFromYoutubeId(externalId).then((res) => {
        if (res.response.items.length > 0) {
          const item = res.response.items.pop();
          const { snippet } = item;
          setTitle(snippet.localized.title);
          setThumbnailUrl(snippet.thumbnails.maxres.url);
          setNavUrl(`https://www.youtube.com/watch?v=${externalId}`);
          setContentScore(score);
        }
      });
    } else if (type === contentType.GOOGLE_BOOKS) {
      getDataFromGoogleBooksId(externalId).then((res) => {
        const { volumeInfo } = res.response;
        setTitle(`${volumeInfo.title} ${volumeInfo.subtitle || ''}`);
        if (volumeInfo.imageLinks) {
          setThumbnailUrl(volumeInfo.imageLinks.medium || volumeInfo.imageLinks.thumbnail);
        }
        setNavUrl(volumeInfo.previewLink);
        if (volumeInfo.authors) {
          setAuthor(volumeInfo.authors[0]);
        }
        setContentScore(score);
      });
    }
  }, []);

  // Hacky solution for navigating to an external URL without causing issues
  const navigateToUrl = () => {
    const win = window.open(navUrl, '_blank');
    if (win != null) {
      win.focus();
    }
  };

  // Send updates to the server for like status and update client side with respective score
  const handleLike = () => {
    if (isAuthenticated()) {
      updateLikedContent(getUserId(), contentId).then((data) => {
        if (data && data.type === 'remove') {
          setContentScore(contentScore - 1);
          setIsLiked(false);
        } else if (data && data.type === 'add') {
          setContentScore(contentScore + 1);
          setIsLiked(true);
        }
      });
    }
  };

  // Truncate a string at the word closest to the maximum lenght provided
  function truncateString(phrase, length) {
    if (phrase.length < length) return phrase;

    let trimmed = phrase.slice(0, length);
    trimmed = trimmed.slice(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')));
    return `${trimmed}…`;
  }

  return (
    <div>
      {title && (
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="p" variant="subtitle1">
              {truncateString(title, 50)}
            </Typography>
            <Typography component="i" variant="subtitle2">
              {author}
            </Typography>

          </CardContent>
          <CardActions className={classes.controls}>
            <Typography component="h6" variant="h6">
              {contentScore}
              <span>
                <IconButton onClick={handleLike}>
                  <ThumbUp color={isLiked ? 'primary' : 'inherit'} />
                </IconButton>
                {!viewOnly && (
                <IconButton onClick={() => handleDelete(contentId)}>
                  <Delete />
                </IconButton>
                )}
              </span>
            </Typography>
          </CardActions>
        </div>
        <CardMedia
          className={classes.cover}
          image={thumbnailUrl || image}
          onClick={navigateToUrl}
        />
      </Card>
      )}
    </div>
  );
}

export default NodeContentCard;
