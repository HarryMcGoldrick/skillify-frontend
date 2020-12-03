import React from 'react';
import PropTypes from 'prop-types';
import { Graph } from '../../components';

const Edit = (props) => {
  const { id } = props;
  return (
    <Graph id={id} viewOnly={false} />
  );
};

Edit.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Edit;
