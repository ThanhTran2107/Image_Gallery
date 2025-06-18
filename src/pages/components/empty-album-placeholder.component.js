import { useIntl } from 'react-intl';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10rem;
`;

const Title = styled.p`
  font-size: 4rem;
  font-weight: 600;
  color: var(--text-color);
`;

export const EmptyAlbumPlaceholder = () => {
  const { formatMessage } = useIntl();

  return (
    <Wrapper className="empty-album-placeholder">
      <Title>{formatMessage({ defaultMessage: 'Welcome To The Gallery!' })}</Title>
    </Wrapper>
  );
};
