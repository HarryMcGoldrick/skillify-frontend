import React from 'react';
import PropTypes from 'prop-types';
import Graph from '../../components/graph/graph';

export default function Edit(props) {
  const { id } = props;
  return (
    <Graph id={id} />
  );
}

Edit.propTypes = {
  id: PropTypes.string.isRequired,
};
