import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { FETCH_USER_DATA_REQUEST } from '../../redux/user/userTypes';
import { getUserId, isAuthenticated } from '../../utils/authentication';

function UserData() {
    const dispatch = useDispatch();

    useEffect(() => {
      if (isAuthenticated()) {
        dispatch({type: FETCH_USER_DATA_REQUEST, payload: getUserId()});
      }
    }, [])


    return null;
}

export default UserData
