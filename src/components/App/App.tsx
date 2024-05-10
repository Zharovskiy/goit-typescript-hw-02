import { useState, useEffect, useRef } from "react";
import { fetchImagesSearch } from "../../services/backend-api.js";

import SearchBar from "../SearchBar/SearchBar.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import Loader from "../Loader/Loader.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";

import { pagination } from "../../config/init.js";
import { Image, SearchValue } from "./App.types.js";

import css from "./App.module.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<Image | null>(null);

  const listRef = useRef<HTMLUListElement>(null);
  const scrollHeight = useRef<number>(0);

  useEffect(() => {
    if (!listRef.current) return;
    window.scroll({
      behavior: "smooth",
      top: scrollHeight.current,
    });
    scrollHeight.current = listRef.current.clientHeight;
  }, [images]);

  const handleSubmit = (value: SearchValue): void => {
    if (query !== value.query) {
      setImages([]);
      setCurrentPage(1);
      setQuery(value.query);
    }
  };

  const onLoadMore = (): void => setCurrentPage((prev) => prev + 1);

  const openModal = (id: string): void => {
    const imageModal = images.find((image) => image.id === id);
    if (imageModal === undefined) return;
    setImageModal(imageModal);
    setModalIsOpen(true);
  };

  useEffect(() => {
    async function fetchImages() {
      try {
        setError(false);
        setLoading(true);
        const response = await fetchImagesSearch(
          query,
          currentPage,
          pagination
        );
        setMaxPage(response.total_pages);
        setImages((images) => [...images, ...response.results]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (query !== "") {
      fetchImages();
    }
  }, [query, currentPage]);

  return (
    <>
      <SearchBar handleSubmit={handleSubmit} />
      <div className={css.container}>
        {images.length !== 0 && (
          <ImageGallery images={images} openModal={openModal} ref={listRef} />
        )}
        <Loader loading={loading} />
        {images.length !== 0 && currentPage < maxPage && (
          <LoadMoreBtn onLoadMore={onLoadMore} />
        )}
        {error && <ErrorMessage />}
        <ImageModal
          isOpen={modalIsOpen}
          imageModal={imageModal}
          onClose={() => setModalIsOpen(false)}
        />
      </div>
    </>
  );
};

export default App;
