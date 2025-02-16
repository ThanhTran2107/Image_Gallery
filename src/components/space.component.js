import { Space as BaseSpace } from 'antd';
import styled from 'styled-components';

const StyledSpace = styled(BaseSpace)`
  ${props => (props.justify ? `justify-content: ${props.justify}` : '')};
`;

export const Space = props => <StyledSpace {...props} />;
