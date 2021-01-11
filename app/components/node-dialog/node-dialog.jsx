import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  AppBar, Box, Grow, IconButton, makeStyles, Tab, Tabs, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';
import NodeDetails from '../node-details/node-details';

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

const Transition = React.forwardRef((props, ref) => <Grow in ref={ref} {...props} />);

const useStyles = makeStyles(() => ({
  paper: {
    minWidth: '200px',
  },
}));

export default function NodeDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [editMode, setEditMode] = React.useState(false);
  const classes = useStyles();
  const { nodeData, cy } = props;
  const { label, description } = nodeData;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const { isOpen } = props;
    setEditMode(false);
    setOpen(isOpen);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  // // Updates the node label
  // updateSelectedNode = (data) => {
  //   const { selectedNode } = this.state;
  //   const { id } = selectedNode;
  //   const node = this.cy.elements(`node[id = "${id}"]`)[0];
  //   if (node) {
  //     node.data('label', data.nodeLabel);
  //     this.selectNode(node.data());
  //   }
  // }

  return (
    <div>
      <Dialog
        classes={{ paper: classes.paper }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Node
          <span style={{ float: 'right' }}>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </span>
          <span style={{ float: 'right' }}>
            <IconButton onClick={handleEdit}>
              <CreateIcon />
            </IconButton>
          </span>
        </DialogTitle>
        <DialogContent>
          <AppBar position="static" color="transparent">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Details" />
              <Tab label="Learning Suggestions" />
              <Tab label="Appearance" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <NodeDetails nodeData={nodeData} editMode={editMode} cy={cy} />
          </TabPanel>
          <TabPanel value={value} index={1} />
          <TabPanel value={value} index={2} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Complete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

NodeDialog.propTypes = {
  nodeData: PropTypes.shape({
    label: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
};
