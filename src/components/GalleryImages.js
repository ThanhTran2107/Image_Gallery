import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border: 3px solid #bf4f74;
`;

export const GalleryImages = ({ images, onDelete }) => {
  return (
    <StyledGallery>
      {images.map(img => (
        <div key={img.id}>
          <StyledImage src={img.url} alt="Uploaded" />
          <button onClick={() => onDelete(img.id)}>Delete</button>
        </div>
      ))}
    </StyledGallery>
  );
};

GalleryImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDelete: PropTypes.func.isRequired,
};
