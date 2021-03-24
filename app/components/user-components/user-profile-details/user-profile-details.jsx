import {
  Avatar, Button, Chip, Grid, IconButton, makeStyles, Paper, Typography,
} from '@material-ui/core';
import { Publish } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUserImage, uploadUserImage } from '../../../services/user-service';
import { getUserId } from '../../../utils/authentication';

const useStyles = makeStyles(() => ({
  avatar: {
    width: 200,
    height: 200,
    margin: 16,
  },
  detailsTitle: {
    marginLeft: 64,
    marginTop: 16,
  },
  details: {
    marginLeft: 64,
    marginTop: 32,
  },
  hr: {
    margin: 8,
  },
}));

function UserProfileDetails(props) {
  const classes = useStyles();
  const {
    username, achievements, badges, graphsCreated, completedNodeCount,
  } = props;

  const [userImage, setUserImage] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(undefined);

  useEffect(() => {
    getUserImage(getUserId()).then((data) => {
      if (data.image) {
        setUserImage(data.image);
      }
    });
  }, []);

  function convertToDataURLviaCanvas(url, callback, outputFormat) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      let canvas = document.createElement('CANVAS');
      const ctx = canvas.getContext('2d');
      let dataURL;
      canvas.height = 200;
      canvas.width = 200;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
      canvas = null;
    };
    img.src = url;
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      const fileType = img.type;
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (!validImageTypes.includes(fileType)) {
        setUserImage(null);
      } else {
        setIsUploading(true);
        convertToDataURLviaCanvas(URL.createObjectURL(img), (base64Img) => {
          setUserImage(base64Img);
        });
      }
    }
  };

  const uploadImage = () => {
    uploadUserImage(getUserId(), userImage).then((data) => {
      if (data.success) {
        setUploadStatus('Successful');
      } else {
        setUploadStatus('unSuccessful');
      }
      setTimeout(() => {
        setUploadStatus(undefined);
      }, 2000);
      setIsUploading(false);
    });
  };

  return (
    <Paper>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Avatar alt="Remy Sharp" src={userImage} className={classes.avatar} style={{ objectFit: 'fill' }} />
        </Grid>
        <Grid item xs={12}>
          {uploadStatus && (
          <p>{uploadStatus}</p>
          )}
          <input accept="image/*" id="icon-button-file" type="file" hidden onChange={onImageChange} />
          <label htmlFor="icon-button-file">
            Upload Image
            <IconButton color="primary" className={classes.button} component="span">
              <Publish />
            </IconButton>
          </label>
          {isUploading && (
          <Button onClick={uploadImage}>
            Confirm
          </Button>
          )}
        </Grid>
        <Grid item xs={8}>
          {badges.map((badge) => <Chip label={badge.name} key={badge._id} variant="outlined" style={{ backgroundColor: badge.color, color: 'white' }} />)}
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid item xs={12} className={classes.hr}>
          <hr />
        </Grid>
        <Grid item xs={12} className={classes.detailsTitle}>
          <Typography component="h5" variant="h5">
            Account information
          </Typography>
          <br />
        </Grid>
        <Grid item xs={12} className={classes.details}>
          <Typography component="h6" variant="h6">
            Username:
            {' '}
            {username}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.hr}>
          <hr />
        </Grid>
        <Grid item xs={12} className={classes.detailsTitle}>
          <Typography component="h5" variant="h5">
            Map information
          </Typography>
          <br />
        </Grid>
        <Grid item xs={12} className={classes.details}>
          <Typography component="h6" variant="h6">
            {/* TODO */}
            Maps Completed: 0
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.details}>
          <Typography component="h6" variant="h6">
            Nodes Completed:
            {' '}
            {completedNodeCount}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.details}>
          <Typography component="h6" variant="h6">
            Maps Created:
            {' '}
            {graphsCreated.length}
          </Typography>
          <br />
        </Grid>
        <Grid item xs={12} className={classes.hr}>
          <hr />
        </Grid>
        <Grid item xs={12} className={classes.detailsTitle}>
          <Typography component="h5" variant="h5">
            Achievement Information
          </Typography>
          <br />
        </Grid>
        <Grid item xs={12} className={classes.details}>
          <Typography component="h6" variant="h6">
            Achievements Completed:
            {' '}
            {achievements.length}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.details}>
          <Typography component="h6" variant="h6">
            Badges Earned:
            {' '}
            {badges.length}
          </Typography>
          <br />
        </Grid>
      </Grid>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  achievements: state.user.achievements,
  badges: state.user.badges,
  graphsCreated: state.user.graphsCreated,
  completedNodeCount: state.user.completedNodeCount,
});

export default connect(mapStateToProps)(UserProfileDetails);
