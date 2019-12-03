import styled from 'styled-components';

export const BigTitle = styled.h1`
  margin: 0;
  padding: 4px 8px;
  color: ${props => {
    if (!props.color) {
      return '#111';
    }
    switch (props.color) {
      case 'primary':
        return props.theme.colors.text.primary;
      case 'secondary':
        return props.theme.colors.text.secondary;
      default:
        return props.color;
    }
  }};
  font-weight: 400;
  font-size: 28px;
`;
