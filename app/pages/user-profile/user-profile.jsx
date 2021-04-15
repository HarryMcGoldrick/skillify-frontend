import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserGraphDetails, UserRewardsDetails } from '../../components';
import UserProfileDetails from '../../components/user-components/user-profile-details/user-profile-details';
import { getUserInfoByUsername } from '../../services/user-service';
import { getUserId } from '../../utils/authentication';

function UserProfile() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    getUserInfoByUsername(username).then((data) => {
      if (data) {
        setUserInfo(data);
      }
      if (data.private === true && data.userId !== getUserId()) setIsVisible(false);
    });
  }, []);

  return (
    <div>
      {userInfo && isVisible && (
      <Grid
        container
        direction="row"
        justify="center"
        style={{ marginLeft: '600px', marginTop: '50px' }}
        spacing={8}
      >
        <Grid item xs={2}>
          <UserProfileDetails userInfo={userInfo} />
        </Grid>
        <Grid item xs={9}>
          <Grid item xs={5}>
            <UserRewardsDetails achievements={userInfo.achievements} />
          </Grid>
          <Grid item xs={5} style={{ marginTop: '80px' }}>
            <UserGraphDetails graphsCreated={userInfo.graphs_created} graphsProgressing={userInfo.graphs_progressing} />
          </Grid>
        </Grid>
      </Grid>
      )}
    </div>
  );
}

export default UserProfile;
