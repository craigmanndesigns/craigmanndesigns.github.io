import React, { useEffect, useRef, useState } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";
import { useInView } from "framer-motion";
import { Clear, ChevronLeft, ChevronRight } from "@mui/icons-material";


const Grid = ({ blok, sectionTheme }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [animatedContent, setAnimatedContent] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [images, setImages] = useState([]);
  const [currentURL, setCurrentURL] = useState("");

  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.08,
  });

  useEffect(() => {
    setAnimatedContent(blok.animatedContent);
  }, [blok.animatedContent]);

  // Extract images safely without mutating state directly
  useEffect(() => {
    const body = blok.columns || [];
    const extractedImages = body
      .filter((x) => x.component === "image" && x.image?.filename)
      .map((x) => x.image.filename);
    setImages(extractedImages);
  }, [blok.columns]);

  useEffect(() => {
    setIsAnimated(isInView);
  }, [isInView]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentURL("");
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = images.indexOf(currentURL);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentURL(images[nextIndex]);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = images.indexOf(currentURL);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      setCurrentURL(images[prevIndex]);
    }
  };

  function renderImageModal() {
    if (!currentURL) return null;

    return (
      <div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4"
        onClick={handleCloseModal}
      >
        {/* Lightbox Content Container */}
        <div
          className="max-w-5xl max-h-[90vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className=
            {clsx(
              "flex absolute top-4 right-4 gap-x-4 z-30 p-2 bg-black text-white border border-white",
              "hover:bg-black hover:text-white hover:border-accent hover:border-2"
            )}
            aria-label="Close modal"
          >
            <span className={clsx("h-6 w-6 flex items-center justify-middle")}>
              <Clear />
            </span>
          </button>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 p-4 gap-x-4  bg-black text-white border border-white"
              aria-label="Previous image"
            >
              <span className={clsx("h-6 w-6 flex items-center justify-middle")}>
                <ChevronLeft />
              </span>
            </button>
          )}

          {/* Image */}
          <img
            src={currentURL}
            alt="Lightbox view"
            className="max-h-[80vh] max-w-full object-contain shadow-lg"
          />

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 p-4 gap-x-4  bg-black text-white border border-white"
              aria-label="Next image"
            >
              <span className={clsx("h-6 w-6 flex items-center justify-middle")}>
                <ChevronRight />
              </span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={clsx(
        "w-full grid lg:grid-cols-12 lg:gap-x-4 lg:gap-y-8 items-end",
        "md:grid-cols-6",
        "max-sm:grid-cols-2 max-sm:gap-y-12"
      )}
      ref={ref}
    >
      {blok.columns.map((blokItem) => (
        <StoryblokComponent
          key={blokItem._uid}
          blok={blokItem}
          isAnimated={isAnimated}
          animatedContent={animatedContent}
          setCurrentURL={setCurrentURL}
          setOpenModal={setOpenModal}
          sectionTheme={sectionTheme}
        />
      ))}
      {openModal ? renderImageModal() : null}
    </div>
  );
};

export default Grid;