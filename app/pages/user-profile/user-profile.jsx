import { Grid } from '@material-ui/core';
import React from 'react';
import { UserGraphDetails, UserRewardsDetails } from '../../components';
import UserProfileDetails from '../../components/user-components/user-profile-details/user-profile-details';

function UserProfile() {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      style={{ marginLeft: '700px', marginTop: '50px' }}
      spacing={8}
    >
      <Grid item xs={2}>
        <UserProfileDetails />
      </Grid>
      <Grid item xs={9}>
        <Grid item xs={5}>
          <UserRewardsDetails />
        </Grid>
        <Grid item xs={5} style={{ marginTop: '80px' }}>
          <UserGraphDetails />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
