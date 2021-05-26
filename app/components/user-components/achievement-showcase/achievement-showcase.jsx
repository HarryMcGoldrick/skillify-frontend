import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid, Grow, IconButton, makeStyles, Tooltip,
} from '@material-ui/core';

import React, { useEffect } from 'react';
import { getAllAchievements } from '../../../services/achievement-service';

const Transition = React.forwardRef((props, ref) => <Grow in ref={ref} {...props} />);

const useStyles = makeStyles(() => ({
  paper: {
    minWidth: '700px',
    minHeight: '700px',
  },
  avatar: {
    width: 80,
    height: 80,
  },
}));

function AchievementShowcase(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [achievements, setAchievements] = React.useState([]);
  const { achievements: userAchievements } = props;

  const fetchAllAchievements = () => {
    getAllAchievements().then((data) => {
      setAchievements(data);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    console.log(userAchievements);
    console.log(achievements);
    fetchAllAchievements();
  }, []);

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Show all
      </Button>
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
          Achievements
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="row"
            alignItems="center"
            align="center"
          >
            {achievements.length > 0 && achievements.map((obj, index) => {
              const isUnlocked = userAchievements.includes(obj.name);
              return (
                <Grid item xs={4} key={obj._id} style={index <= 2 ? { marginTop: 25 } : { marginTop: 50 }}>
                  <Tooltip title={<span style={{ fontSize: 16 }}>{obj.name}</span>} arrow>
                    <Fab color="primary">
                      <img className={classes.avatar} alt="achievement" src={obj.image} style={!isUnlocked ? { filter: 'grayscale(100%)' } : {}} />
                    </Fab>
                  </Tooltip>
                </Grid>
              );
            })}
          </Grid>

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

export default AchievementShowcase;
