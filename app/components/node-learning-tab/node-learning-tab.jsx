import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getYoutubeVideoForNode } from '../../services/content-service';

const NodeLearningTab = (props) => {
  const [youtubeContentData, setYoutubeContentData] = useState(null);
  const { nodeData } = props;

  // Get relevant youtube content for a node label
  const getYoutubeContentForNode = (label) => {
    getYoutubeVideoForNode(label).then((res) => {
      console.log(res);
      setYoutubeContentData(res.data.response.items[0]);
    });
  };

  useEffect(() => {
    if (nodeData.label) {
      getYoutubeContentForNode(nodeData.label);
    }
  }, [props]);

  return (
    <div>

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

NodeLearningTab.propTypes = {
  nodeData: PropTypes.object.isRequired,
};

export default NodeLearningTab;
