import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

function PrivacyToggle(props) {
  const { initialStatus, updatePrivacy, id } = props;
  const [checked, setChecked] = useState(false);

  // Set the state of the toggle to the initial state from props
  useEffect(() => {
    setChecked(initialStatus);
  }, [props]);

  // Update the privacy using the updatePrivacy props
  const handleUpdate = () => {
    updatePrivacy(id, !checked).then((data) => {
      if (data.success) {
        setChecked(!checked);
      } else {
        setChecked(checked);
      }
    });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch size="Normal" checked={checked} onChange={handleUpdate} />}
        label="Toggle Private Mode"
      />
    </FormGroup>
  );
}

export default PrivacyToggle;
