import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { pollAchievements } from '../../../services/achievement-service';
import { getUserId, isAuthenticated } from '../../../utils/authentication';

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
