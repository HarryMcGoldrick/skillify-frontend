import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { BlockPicker, CirclePicker, CompactPicker } from 'react-color';
import { Autocomplete } from '@material-ui/lab';
import {
  Button, Grid, makeStyles, TextField, Typography,
} from '@material-ui/core';
import { addStyle } from '../../../redux/graph/graphActions';
import shape from '../../../enums/shapes';

const useStyles = makeStyles((theme) => ({
  columnItem: {
    margin: 16,
    width: 400,
  },
}));

function NodeAppearance(props) {
  const classes = useStyles();

  const { register, handleSubmit } = useForm();
  const [currentColor, setCurrentColor] = useState('#fff');
  const [selectedShape, setSelectedShape] = useState();
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState();

  const updateShape = () => {
    const styleElement = {
      selector: `node[id = "${props.selectedNode.id}"]`,
      style: {
        'background-color': currentColor,
        shape: selectedShape,
        'background-image': image || undefined,
        'background-width': '100%',
        'background-height': '100%',
      },
    };
    props.addStyle(styleElement);
  };

  const handleChangeComplete = (color) => {
    setCurrentColor(color.hex);
  };

  function convertToDataURLviaCanvas(url, callback, outputFormat) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      let canvas = document.createElement('CANVAS');
      const ctx = canvas.getContext('2d');
      let dataURL;
      canvas.height = 64;
      canvas.width = 64;
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
      setImageName(img.name);
      const fileType = img.type;
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (!validImageTypes.includes(fileType)) {
        setImage(null);
      } else {
        convertToDataURLviaCanvas(URL.createObjectURL(img), (base64Img) => {
          setImage(base64Img);
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(updateShape)}>
      <Grid container direction="column" align="center" alignItems="center">
        <Grid item xs={12}>
          <CirclePicker
            color={currentColor}
            circleSize={40}
            className={classes.columnItem}
            onChangeComplete={handleChangeComplete}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            name="shapes"
            id="shapes"
            options={Object.values(shape)}
            style={{ margin: 8 }}
            getOptionLabel={(option) => option}
            onChange={(event, value) => setSelectedShape(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Shape"
                placeholder="Select Shape"
              />
            )}
            className={classes.columnItem}
          />
        </Grid>
        {imageName && (
          <Typography component="span" style={{ marginLeft: '16px' }}>{imageName}</Typography>
        )}
        <Grid item xs={12}>

          <Button
            variant="contained"
            component="label"
            className={classes.columnItem}
          >
            Upload File
            <input
              accept="image/*"
              type="file"
              hidden
              onChange={onImageChange}
            />
          </Button>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.columnItem}
        >
          Update Apperance

        </Button>
      </Grid>
    </form>
  );
}

const mapStateToProps = (state) => ({
  selectedNode: state.graph.present.selectedNode,
});

const mapDispatchToProps = (dispatch) => ({
  addStyle: (styleElement) => dispatch(addStyle(styleElement)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeAppearance);
