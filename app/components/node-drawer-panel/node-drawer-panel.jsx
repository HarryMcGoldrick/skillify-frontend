import {
  AppBar, Box, Tab, Tabs, Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NodeDetails from '../node-details/node-details';
import NodeLearningTab from '../node-learning-tab/node-learning-tab';

const NodeDrawerPanel = (props) => {
  const [value, setValue] = React.useState(0);
  const {
    selectedNode, progressMode, viewOnly,
  } = props;


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {selectedNode.id && (
        <div>
          <AppBar position="static" color="transparent">
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Details" />
              <Tab label="Learning" />
              <Tab label="Appearance" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <NodeDetails nodeData={selectedNode} isProgressMode={progressMode} viewOnly={viewOnly} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <NodeLearningTab nodeData={selectedNode} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <h3>under construction!</h3>
          </TabPanel>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedNode: state.graph.selectedNode,
  progressMode: state.graph.isProgressMode,
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
