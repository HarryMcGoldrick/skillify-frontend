import React from 'react';
import PropTypes from 'prop-types';
import Graph from '../../components/graph/graph';

export default function Create(props) {
  const { id } = props;
  return (
    <Graph id={id} />
  );
}

Create.propTypes = {
  id: PropTypes.string.isRequired,
};
