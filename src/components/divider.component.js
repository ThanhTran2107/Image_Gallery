import { Divider as BaseDivider } from 'antd';
import styled from 'styled-components';

const StyledDivider = styled(BaseDivider)`
  border-color: var(--divider-border-color);
`;

export const Divider = props => <StyledDivider {...props} />;
