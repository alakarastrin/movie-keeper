import styled from 'styled-components';

export const MainContainer = styled.div`
  max-width: ${props => {
    const { maxWidth = 'lg' } = props;
    switch (maxWidth) {
      case 'sm':
        return '600px';
      case 'md':
        return '719px';
      case 'lg':
        return '960px';
      case 'xl':
        return '1600px';
    }
  }};
  margin: 0 auto;
`;

export default {};
