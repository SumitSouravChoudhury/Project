import PropTypes from "prop-types";
import "./ImageModal.css";

const ImageModal = ({ selectedImage, closeModal }) => {
  const handleDownloadClick = async () => {
    const response = await fetch(selectedImage.largeImageURL);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "downloaded_image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={selectedImage.webformatURL} alt={selectedImage.tags} />
        <div className="modal-desc">
          <p>Tags: {selectedImage.tags}</p>
          <p>Width: {selectedImage.imageWidth}px</p>
          <p>Height: {selectedImage.imageHeight}px</p>
          <button onClick={handleDownloadClick}>Download</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  selectedImage: PropTypes.shape({
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    largeImageURL: PropTypes.string,
  }),
  closeModal: PropTypes.func.isRequired,
};

export default ImageModal;
