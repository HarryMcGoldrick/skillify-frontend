import {
  Grid, makeStyles, Paper, Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { getAchievementObjects } from '../../../services/achievement-service';

const useStyles = makeStyles(() => ({
  paper: {
    padding: 16,
  },
  avatar: {
    width: 80,
    height: 80,
  },
}));

/*
 Displays the achievements that a user has earned
*/

function UserRewardsDetails(props) {
  const classes = useStyles();
  const { achievements } = props;
  const [achievementObjs, setAchievementObjs] = useState([]);

  useEffect(() => {
    getAchievementObjects(achievements).then((data) => {
      if (data.length > 0) {
        setAchievementObjs(data);
      }
    });
  }, [props]);

  return (
    <Paper className={classes.paper}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h5">
          Achievements
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        align="center"
        style={{ marginTop: 25 }}
      >

        {achievementObjs.map((obj, index) => (
          <Grid item xs={4} key={obj._id}>
            <Tooltip title={<span style={{ fontSize: 16 }}>{obj.name}</span>} arrow>
              <Fab color="primary">
                <img className={classes.avatar} alt="achievement" src={obj.image} />
              </Fab>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default UserRewardsDetails;
