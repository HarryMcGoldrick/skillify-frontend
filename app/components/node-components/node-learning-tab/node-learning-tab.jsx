import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getYoutubeVideoForNode } from '../../../services/content-service';
import { NodeContentCard } from '../..';
import { ButtonBase, Grid, IconButton, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import booksIcon from '../../../assets/booksIcon.png';
import youtubeIcon from '../../../assets/youtubeIcon.png';
import hyperlinkIcon from '../../../assets/hyperlinkIcon.png';
import contentType from '../../../enums/content-type';
import { useForm } from 'react-hook-form';
import { Add } from '@material-ui/icons';
import { addContentToNode } from '../../../services/content-service';
import { extractGoogleBooksIdFromUrl, extractYoutubeIdFromUrl } from '../../../utils/content-utils';
import { useParams } from 'react-router';
import { addContentToNodeAction } from '../../../redux/graph/graphActions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  imageRow: {
    display: 'inline-flex',
    margin: '8px',
    width: '100%'
  },
  imageButton: {
    marginLeft: '100px',
    marginBottom: '18px',
  },
  image: {
    width: '64px',
    height: '64px',
    },
  textField: {
    width: '100%',
    marginTop: '8px',
    marginBottom: '8px',
  },
  contentCard: {
    margin: '8px',
  }
}));

const NodeLearningTab = (props) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const {id: graphId} = useParams();
  const [formToggle, setFormToggle] = useState(false);
  const [currentType, setCurrentType] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch()
  const { nodeData, likedContent } = props;


  const addContentToNodeHandler = (data) => {
    let externalId = '';
    if (currentType === contentType.GOOGLE_BOOKS) {
      externalId = extractGoogleBooksIdFromUrl(data.url);
    } else if (currentType === contentType.YOUTUBE) {
      externalId = extractYoutubeIdFromUrl(data.url);
    }

    if (externalId === false) {
      setIsError(true);
      return;
    } else {
      setIsError(false)
    }

    const content = {
      type: currentType,
      externalId,
      score: 0
    }
    addContentToNode(graphId, nodeData.id, content).then((data) => {
      console.log(data.response);
      if (data.response) {
        dispatch(addContentToNodeAction(content));
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false)
        }, 1000)
      }
    })
    
    setFormToggle(false);
  } 

  const toggleForm = (contentType) => {
      setCurrentType(contentType);
      setFormToggle(true);
  }

  return (
    <div>
      <Typography variant="h6" style={{textAlign: 'center'}}>
        Add Content
      </Typography>
      <Paper elevation={1}>
        <div className={classes.imageRow}>
          <ButtonBase
            className={classes.imageButton}
            focusRipple
            style={{
              width: '64px',
            }}>
            <img src={youtubeIcon} className={classes.image} onClick={() => toggleForm(contentType.YOUTUBE)}></img>
          </ButtonBase>
          <ButtonBase
            className={classes.imageButton}
            focusRipple
            style={{
              width: '64px',
            }}>
            <img src={booksIcon} className={classes.image} onClick={() => toggleForm(contentType.GOOGLE_BOOKS)}></img>
          </ButtonBase>
        </div>
      </Paper>
      <span style={{margin: '16px'}}></span>
      {isError && (
        <p style={{color: 'red'}}>Invalid Url</p>
      )}
      {isSuccess && (
        <p style={{color: 'green'}}>Success!</p>
      )}
      {formToggle && (
      <form>
         <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
        >
        <Grid item xs={11} className={classes.formInput}>
          <TextField type="url" name="url" label={currentType === contentType.YOUTUBE ? 'Youtube Url' : 'Google Books Url'} 
          variant="outlined" inputRef={register({ required: true })} className={classes.textField} />
        </Grid> 
        <Grid item xs={1} className={classes.formInput}>
          <IconButton color="primary" onClick={handleSubmit(addContentToNodeHandler)} component="span">
                  <Add />
          </IconButton>
          </Grid>
        </Grid>
      </form>
      )}
      {nodeData.content.map((content, index) => {
        if (!content) return;
        return (
          <div className={classes.contentCard} key={index}>
            <NodeContentCard  contentData={content} likedContent={likedContent}></NodeContentCard>
          </div>
        )
      })}

    </div>
  );
};

export default NodeLearningTab;
