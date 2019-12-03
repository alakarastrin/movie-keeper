import styled from 'styled-components';

export const NavbarEl = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${props => props.theme.colors.primary.main};
  height: 70px;
  padding: 8px;
`;
