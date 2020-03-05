// @flow
import React from 'react';
import LoginButton from '@ncigdc/components/LoginButton';

const CAMessage = ({
  hasAccess,
  isAuth,
}) => (isAuth
  ? hasAccess
    ? (<p>Select a single controlled access dataset you wish to explore with the open dataset(s):</p>)
    : (<p>You do not have access to any controlled datasets, please apply for access.</p>)
  : (
    <p>
      The following matrix shows the program data that can be explored in this section.
      <br />
      Please
      {' '}
      <LoginButton keepModalOpen>log in</LoginButton>
      {' '}
      to choose the controlled dataset you wish to explore.
    </p>
));

export default CAMessage;
