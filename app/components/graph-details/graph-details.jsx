import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const GraphDetails = (props) => {
  const { register, handleSubmit } = useForm();
  const {
    graphName, selectedNode, updateSelectedNode, youtubeContentData, viewOnly,
  } = props;
  const { label } = selectedNode;

  const onSubmit = (data) => updateSelectedNode(data);

  return (
    <div>
      <h3>
        Map:
        {` ${graphName || ''}`}
      </h3>
      <hr />
      <h3>
        Node:
        {` ${label || ''}`}

      </h3>
      {!viewOnly && label && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField name="nodeLabel" label="Node label" variant="outlined" inputRef={register({ required: true })} />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      )}
      {youtubeContentData && (
      <iframe
        id="ytplayer"
        title="ytplayer"
        type="text/html"
        src={`https://www.youtube.com/embed/${youtubeContentData.id.videoId}`}
        frameBorder="0"
        width="100%"
        height="200px"
      />
      )}
    </div>
  );
};

GraphDetails.propTypes = {
  graphName: PropTypes.string,
  selectedNode: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }),
  updateSelectedNode: PropTypes.func.isRequired,
  youtubeContentData: PropTypes.object,
  viewOnly: PropTypes.bool.isRequired,
};

GraphDetails.defaultProps = {
  graphName: '',
  selectedNode: {},
  youtubeContentData: undefined,
};

export default GraphDetails;
