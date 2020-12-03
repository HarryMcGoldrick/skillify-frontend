import React from 'react';
import PropTypes from 'prop-types';
import { Graph } from '../../components';

const ViewGraph = (props) => {
  const { id } = props;
  return (
    <Graph id={id} viewOnly />
  );
};

ViewGraph.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ViewGraph;
