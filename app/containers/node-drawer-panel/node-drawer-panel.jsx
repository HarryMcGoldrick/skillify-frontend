import {
  AppBar, Box, Tab, Tabs, Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NodeDetails from '../../components/node-components/node-details/node-details';
import NodeLearningTab from '../../components/node-components/node-learning-tab/node-learning-tab';
import NodeAppearance from '../../components/node-components/node-apperance/node-appearance';

const NodeDrawerPanel = (props) => {
  const [value, setValue] = React.useState(0);
  const {
    selectedNode, progressMode, viewOnly, likedContent,
  } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {selectedNode.id && (
        <div>
          <AppBar position="static" color="transparent" style={{ width: 500 }}>
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab label="Details" />
              <Tab label="Learning" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <NodeDetails nodeData={selectedNode} isProgressMode={progressMode} viewOnly={viewOnly} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <NodeLearningTab viewOnly={viewOnly} />
          </TabPanel>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedNode: state.graph.present.selectedNode,
  progressMode: state.graph.present.isProgressMode,
  likedContent: state.user.likedContent,
});

export default connect(mapStateToProps)(NodeDrawerPanel);

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
      <Box p={3}>
        <Typography component="span">{children}</Typography>
      </Box>
      )}
    </div>
  );
}
