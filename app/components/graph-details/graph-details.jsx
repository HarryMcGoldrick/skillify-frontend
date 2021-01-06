import { makeStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  container: {
    minWidth: '350px',
    margin: '10px',
  },
  title: {
    textAlign: 'center',
  },
});

// Used to display the details of the graph
const GraphDetails = (props) => {
  const classes = useStyles();
  const {
    graphName, graphDescription, viewOnly,
  } = props;

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>
        {` ${graphName || ''}`}
      </h3>
      <p>{` ${graphDescription || ''}`}</p>
      <hr />
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
