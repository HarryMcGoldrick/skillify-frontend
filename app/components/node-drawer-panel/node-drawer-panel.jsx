import {
  AppBar, Box, Tab, Tabs, Typography,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import NodeDetails from '../node-details/node-details';

const NodeDrawerPanel = (props) => {
  const [value, setValue] = React.useState(0);
  const {
    nodeData, cy, isNodeComplete, progressMode, viewOnly,
  } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="transparent">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Details" />
          <Tab label="Learning" />
          <Tab label="Appearance" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <NodeDetails nodeData={nodeData} cy={cy} isNodeComplete={isNodeComplete} isProgressMode={progressMode} viewOnly={viewOnly} />
      </TabPanel>
      <TabPanel value={value} index={1} />
      <TabPanel value={value} index={2} />
    </div>
  );
};

NodeDrawerPanel.propTypes = {
  nodeData: PropTypes.object.isRequired,
  cy: PropTypes.object.isRequired,
};

export default NodeDrawerPanel;

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
