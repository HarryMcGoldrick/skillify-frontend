import { Card, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography, useTheme } from '@material-ui/core'
import { Delete, ThumbsUpDown, ThumbUp } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import placeholder from '../../../assets/placeholder.png'
import contentType from '../../../enums/content-type'
import { getDataFromGoogleBooksId, getDataFromYoutubeId, removeContent } from '../../../services/content-service';
import { updateLikedContent } from '../../../services/user-service';
import { getUserId, isAuthenticated } from '../../../utils/authentication';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%'
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

function NodeGeneratedContentCard(props) {
    const classes = useStyles();
    const { contentData, likedContent, handleDelete, viewOnly } = props
    const [title, setTitle] = useState();
    const [thumbnailUrl, setThumbnailUrl] = useState();
    const [navUrl, setNavUrl] = useState();
    const [author, setAuthor] = useState();
    const [contentScore, setContentScore] = useState();
    const [isLiked, setIsLiked] = useState();


    useEffect(() => {
        console.log(contentData)
        if (isAuthenticated()) {
        //   if (likedContent && likedContent.includes(contentId)) {
        //     setIsLiked(true);
        //   } else {
        //     setIsLiked(false);
        //   }
        }

        // If snippet then the data is from youtube
        const type = contentData.kind === 'youtube#searchResult' ? contentType.YOUTUBE : contentType.GOOGLE_BOOKS

        if (type === contentType.YOUTUBE) {
            const { snippet } = contentData;
            setTitle(snippet.title);
            setThumbnailUrl(snippet.thumbnails.high.url);
            setNavUrl(`https://www.youtube.com/watch?v=${contentData.id.videoId}`)
        } else if (type === contentType.GOOGLE_BOOKS) {
            const { volumeInfo } = contentData;
            setTitle(`${volumeInfo.title} ${volumeInfo.subtitle || ''}`);
            if (volumeInfo.imageLinks) {
                setThumbnailUrl(volumeInfo.imageLinks.medium || volumeInfo.imageLinks.thumbnail);
            }
            setNavUrl(volumeInfo.previewLink)
            if (volumeInfo.authors) {
                setAuthor(volumeInfo.authors[0])
            }
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

    function truncateString(phrase, length) {
      if (phrase.length < length) return phrase
        else {
          let trimmed = phrase.slice(0, length)
          trimmed = trimmed.slice(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')))
          return trimmed + '…'
        }
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
                image={thumbnailUrl || placeholder}
                onClick={navigateToUrl}
              />
          </Card>
        )}
    </div>
    )
}

export default NodeGeneratedContentCard


