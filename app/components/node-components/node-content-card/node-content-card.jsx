import { Card, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography, useTheme } from '@material-ui/core'
import { Delete, ThumbsUpDown, ThumbUp } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import image from '../../../assets/placeholder.png'
import contentType from '../../../enums/content-type'
import { getDataFromYoutubeId, removeContent } from '../../../services/content-service';
import { updateLikedContent } from '../../../services/user-service';
import { getUserId, isAuthenticated } from '../../../utils/authentication';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '180px',
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

function NodeContentCard(props) {
    const classes = useStyles();
    const { contentData, likedContent, handleDelete, viewOnly } = props
    const {type, externalId, score, _id: contentId} = contentData
    const {id: graphId} = useParams();
    const [title, setTitle] = useState();
    const [thumbnailUrl, setThumbnailUrl] = useState();
    const [navUrl, setNavUrl] = useState();
    const [contentScore, setContentScore] = useState();
    const [isLiked, setIsLiked] = useState();


    useEffect(() => {
        if (isAuthenticated()) {
          if (likedContent && likedContent.includes(contentId)) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }
        }
        if (type === contentType.YOUTUBE) {
            getDataFromYoutubeId(externalId).then(res => {
              if (res.response.items.length > 0) {
                const item = res.response.items.pop();
                const snippet = item.snippet;
                setTitle(snippet.localized.title);
                setThumbnailUrl(snippet.thumbnails.maxres.url);
                setNavUrl(`https://www.youtube.com/watch?v=${externalId}`)
                setContentScore(score);
              }
            })
        } else if (type === contentType.GOOGLE_BOOKS) {
            // getDataFromGoogleBooksUrl()
        }
    }, [])

    const navigateToUrl = () => {
      const win = window.open(navUrl, '_blank');
      if (win != null) {
        win.focus();
      }
    }

    const handleLike = () => {
      if (isAuthenticated()) {
        updateLikedContent(getUserId(), contentId).then((data) => {
          if (data && data.type === 'remove') {
            setContentScore(contentScore - 1)
            setIsLiked(false);
          } else if (data && data.type === 'add') {
            setContentScore(contentScore + 1)
            setIsLiked(true);
          }
        });
      }
    }



    return (
      <div>
        {title && (
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="p" variant="subtitle1">
                  {title}
                </Typography>

              </CardContent>
              <CardActions className={classes.controls}>
                <Typography component="h6" variant="h6">
                {contentScore}
                  <span>
                    <IconButton onClick={handleLike}>
                      <ThumbUp></ThumbUp>
                    </IconButton>
                    {!viewOnly && (
                      <IconButton onClick={() => handleDelete(contentId)}>
                      <Delete></Delete>
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
    )
}

export default NodeContentCard
