import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grow, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const Transition = React.forwardRef((props, ref) => <Grow in ref={ref} {...props} />);

const useStyles = makeStyles(() => ({
  paper: {
    minWidth: '200px',
  },
}));

export default function NodeDetails(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { nodeData } = props;
  const { label, description } = nodeData;

  useEffect(() => {
    const { isOpen } = props;
    setOpen(isOpen);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
  };

  // // Get relevant youtube content for a node label
  // getYoutubeContentForNode = (label) => {
  //   getYoutubeVideoForNode(label).then((res) => {
  //     this.setState({ youtubeNodeData: res.data.response.items[0] });
  //   });
  // }

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
        <DialogTitle id="alert-dialog-slide-title">{label}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {description}
          </DialogContentText>
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

NodeDetails.propTypes = {
  nodeData: PropTypes.shape({
    label: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
};
