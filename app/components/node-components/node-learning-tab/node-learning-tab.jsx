import React, { useEffect, useState } from 'react';
import {
  ButtonBase, Grid, IconButton, makeStyles, Paper, TextField, Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Add } from '@material-ui/icons';
import { connect, useDispatch } from 'react-redux';
import {
  getContentForNode, getYoutubeVideoForNode, removeContent, getGoogleBooksForNode, addContent,
} from '../../../services/content-service';
import { NodeContentCard } from '../..';
import booksIcon from '../../../assets/booksIcon.png';
import youtubeIcon from '../../../assets/youtubeIcon.png';
import contentType from '../../../enums/content-type';
import { extractGoogleBooksIdFromUrl, extractYoutubeIdFromUrl, generateQueryStringFromNodes } from '../../../utils/content-utils';
import { isAuthenticated } from '../../../utils/authentication';
import NodeGeneratedContentCard from '../node-generated-content-card/node-generated-content-card';

const useStyles = makeStyles((theme) => ({
  imageRow: {
    display: 'inline-flex',
    margin: '8px',
    width: '100%',
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
  },
}));

const NodeLearningTab = (props) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [formToggle, setFormToggle] = useState(false);
  const [currentType, setCurrentType] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [content, setContent] = useState([]);
  const [generatedContent, setGeneratedContent] = useState([]);
  const dispatch = useDispatch();
  const {
    nodeData, likedContent, viewOnly, nodePath,
  } = props;

  const addContentHandler = (data) => {
    let externalId = '';
    if (currentType === contentType.GOOGLE_BOOKS) {
      externalId = extractGoogleBooksIdFromUrl(data.url);
    } else if (currentType === contentType.YOUTUBE) {
      externalId = extractYoutubeIdFromUrl(data.url);
    }

    if (externalId === false) {
      setIsError(true);
      return;
    }
    setIsError(false);

    const newContent = {
      nodeId: nodeData.id,
      type: currentType,
      externalId,
      score: 0,
    };

    addContent(nodeData.id, newContent).then((data) => {
      if (data.response) {
        const contentWithId = {
          ...newContent,
          _id: data.response,
        };
        setContent([...content, contentWithId]);
        toggleSuccess(true);
      }
    });

    setFormToggle(false);
  };

  const toggleSuccess = (bool) => {
    setIsSuccess(bool);
    setTimeout(() => {
      setIsSuccess(!bool);
    }, 1000);
  };

  const toggleForm = (contentType) => {
    setCurrentType(contentType);
    setFormToggle(true);
  };

  const handleDelete = (contentId) => {
    if (isAuthenticated()) {
      removeContent(contentId).then((data) => {
        if (data.response && data.response.deletedCount > 0) {
          toggleSuccess(true);
          const newContent = content.filter((contentObj) => contentObj._id.toString() !== contentId.toString());
          setContentWithOrdering(newContent);
        }
      });
    }
  };

  // Compare score values and return in descending order
  const setContentWithOrdering = (contentToOrder) => {
    const orderedContent = contentToOrder.sort(compareScores);
    setContent(orderedContent);
  };

  const compareScores = (a, b) => {
    if (a.score > b.score) {
      return -1;
    }
    if (a.score < b.score) {
      return 1;
    }
    return 0;
  };

  const fetchGeneratedContent = async () => {
    const queryString = generateQueryStringFromNodes(nodePath);
    let contentToAdd = [];

    await getYoutubeVideoForNode(queryString).then((data) => {
      contentToAdd = [...contentToAdd, ...data.response.items];
    });

    await getGoogleBooksForNode(queryString).then((data) => {
      contentToAdd = [...contentToAdd, ...data.response.items];
    });

    setGeneratedContent(contentToAdd);
  };

  useEffect(() => {
    getContentForNode(nodeData.id).then((data, err) => {
      if (err) {
        console.log(err);
      } else {
        setContentWithOrdering(data.content);
      }
    });
    fetchGeneratedContent();
  }, [props]);

  return (
    <div>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        Add Content
      </Typography>
      <Paper elevation={1}>
        <div className={classes.imageRow}>
          <ButtonBase
            className={classes.imageButton}
            focusRipple
            style={{
              width: '64px',
            }}
          >
            <img src={youtubeIcon} className={classes.image} onClick={() => toggleForm(contentType.YOUTUBE)} />
          </ButtonBase>
          <ButtonBase
            className={classes.imageButton}
            focusRipple
            style={{
              width: '64px',
            }}
          >
            <img src={booksIcon} className={classes.image} onClick={() => toggleForm(contentType.GOOGLE_BOOKS)} />
          </ButtonBase>
        </div>
      </Paper>
      <span style={{ margin: '16px' }} />
      {isError && (
        <p style={{ color: 'red' }}>Invalid Url</p>
      )}
      {isSuccess && (
        <p style={{ color: 'green' }}>Success!</p>
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
            <TextField
              type="url"
              name="url"
              label={currentType === contentType.YOUTUBE ? 'Youtube Url' : 'Google Books Url'}
              variant="outlined"
              inputRef={register({ required: true })}
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={1} className={classes.formInput}>
            <IconButton color="primary" onClick={handleSubmit(addContentHandler)} component="span">
              <Add />
            </IconButton>
          </Grid>
        </Grid>
      </form>
      )}
      {content.map((content) => {
        if (!content) return;
        return (
          <div className={classes.contentCard} key={content._id}>
            <NodeContentCard contentData={content} likedContent={likedContent} handleDelete={handleDelete} viewOnly={viewOnly} />
          </div>
        );
      })}
      {generatedContent.map((content) => {
        if (!content) return;
        return (
          <div className={classes.contentCard} key={content.etag}>
            <NodeGeneratedContentCard contentData={content} likedContent={likedContent} handleDelete={handleDelete} viewOnly={viewOnly} />
          </div>
        );
      })}

    </div>
  );
};

const mapStateToProps = (state) => ({
  nodeData: state.graph.selectedNode,
  progressMode: state.graph.isProgressMode,
  nodePath: state.graph.selectedNodePath,
  likedContent: state.user.likedContent,
});

export default connect(mapStateToProps)(NodeLearningTab);
