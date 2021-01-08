import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  container: {
    width: '350px',
    margin: '10px',
  },
  title: {
    textAlign: 'center',
  },
});

// Used to display the details of the graph
const GraphDetails = (props) => {
  const classes = useStyles();
  // const [isProgressMode, setIsProgressMode] = useState(false);
  const {
    graphName, graphDescription, viewOnly, addGraphToProgress, progressMode,
  } = props;

  // useEffect(() => {
  //   setIsProgressMode(progressMode);
  // }, [props]);

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>
        {` ${graphName || ''}`}
      </h3>
      <p style={{ textOverflow: 'wrap' }}>{` ${graphDescription || ''}`}</p>
      <hr />
      {viewOnly && !progressMode && (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={addGraphToProgress}
      >
        Begin tracking
      </Button>
      )}
    </div>
  );
};

GraphDetails.propTypes = {
  graphName: PropTypes.string,
  graphDescription: PropTypes.string,
  viewOnly: PropTypes.bool.isRequired,
};

GraphDetails.defaultProps = {
  graphName: '',
  graphDescription: '',
};

export default GraphDetails;
