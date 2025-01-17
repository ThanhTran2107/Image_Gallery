import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -20px;
  margin-left: 60px;
  gap: 30px;
`;

const StyledImageContainer = styled.div`
  position: relative;
  width: 100px;
  text-align: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border: 2px solid #bf4f74;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  position: absolute;
  top: -10px;
  right: -13px;
  width: 20px;
  height: 20px;
  background-color: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

export const PreviewImages = ({ images, onDelete }) => {
  return (
    <StyledPreview>
      {images.map(img => (
        <StyledImageContainer key={img.id}>
          <StyledImage src={img.url} alt="Previewed" title={img.file.name} />
          <StyledButton onClick={() => onDelete(img.id)}>X</StyledButton>
        </StyledImageContainer>
      ))}
    </StyledPreview>
  );
};

PreviewImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
