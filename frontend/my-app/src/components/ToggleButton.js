import React from 'react';

const ToggleButton = ({ toggle, isUserData }) => {
  return (
    <button onClick={toggle}>
      {isUserData ? 'Show Post Data' : 'Show User Data'}
    </button>
  );
};

export default ToggleButton;
