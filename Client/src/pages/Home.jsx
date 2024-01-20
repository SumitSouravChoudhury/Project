import "./Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ImageModal from "../components/ImageModal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const PIXABAY_API_KEY = "41912315-3335e551c70ebcfd1b33e0cfe";

function Home() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo`
        );
        setImages(response.data.hits);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (searchClicked && query !== "") {
      fetchData();
    }
  }, [query, searchClicked]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchClicked(true);
    setOpenBackdrop(true);
    setTimeout(() => {
      setOpenBackdrop(false);
    }, 1000);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  return (
    <div className="main">
      <div className="container1">
        <h1>Discover over 2,000,000 free Stock Images</h1>
      </div>
      <div className="container2">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
        />
        <button className="search" onClick={handleSearchClick}>
          Go
        </button>
      </div>
      <div className="container3">
        <p>
          <span>Trending:</span> Flowers, Love, Forest, River
        </p>
      </div>
      {openBackdrop && (
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      )}
      <div className="container4">
        <h1 style={{ display: searchClicked ? "block" : "none" }}>
          Results: {query}
        </h1>
        <div
          className="image-container"
          style={{ display: modalOpen ? "none" : "grid" }}
        >
          {images.map((image) => (
            <img
              key={image.id}
              src={image.webformatURL}
              alt={image.tags}
              className="image-item"
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
        {modalOpen && (
          <ImageModal selectedImage={selectedImage} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
}

export default Home;
