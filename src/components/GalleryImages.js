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

export const GalleryImages = ({ urls, onDelete }) => {
  return (
    <StyledGallery>
      {urls.map((image) => (
        <div key={image.id}>
          <StyledImage src={image.url} alt="Uploaded" />
          <button onClick={() => onDelete(image.id)}>Delete</button>
        </div>
      ))}
    </StyledGallery>
  );
};

GalleryImages.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDelete: PropTypes.func.isRequired,
};
