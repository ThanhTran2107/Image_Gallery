import { COLORS } from 'constant';
import styled from 'styled-components';

const StyledSpinner = styled.div`
  border: 4px solid transparent;
  border-top: 4px solid ${COLORS.BRIGHT_BLUE};
  border-radius: 100%;
  animation: spin 1s linear infinite;
  position: absolute;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner = ({ className }) => <StyledSpinner className={className} />;
