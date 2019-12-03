import React from 'react';
import { NavbarEl } from 'elements/wrappers/main';
import { BigTitle } from 'elements/typography/titles';
import { MainContainer } from 'elements/wrappers/containers';

const AppLayout = props => {
  return (
    <>
      <NavbarEl>
        <BigTitle color="primary">Movie Keeper</BigTitle>
      </NavbarEl>

      <MainContainer maxWidth="xl">{props.children}</MainContainer>
    </>
  );
};

export default AppLayout;
