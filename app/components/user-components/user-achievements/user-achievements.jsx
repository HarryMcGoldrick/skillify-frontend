import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { pollAchievements } from '../../../services/achievement-service';
import { getUserId, isAuthenticated } from '../../../utils/authentication';

/*
  Polls for new achievements that the user has unlocked on page refresh,
  if new achievements are returned then display them using the snackbar hook.
*/
function UserAchievements() {
  const { enqueueSnackbar } = useSnackbar();

  const triggerAchievementSnackBars = (achievements) => {
    achievements.forEach((achievement) => {
      enqueueSnackbar(`Achievement Unlocked!: ${achievement}`, {
        variant: 'success',
      });
    });
  };

  useEffect(() => {
    if (isAuthenticated()) {
      pollAchievements(getUserId()).then((achievements) => {
        if (achievements.length > 0) {
          triggerAchievementSnackBars(achievements);
        }
      });
    }
  }, []);

  return null;
}

export default UserAchievements;
