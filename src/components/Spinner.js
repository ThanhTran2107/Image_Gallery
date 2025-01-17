import styled from 'styled-components';

const StyledSpinner = styled.div`
  border: 4px solid transparent;
  border-top: 4px solid #bf4f74;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  position: absolute;
  top: 20px;
  left: 90px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner = () => <StyledSpinner />;
