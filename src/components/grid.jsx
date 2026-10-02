import React, { useEffect, useRef, useState } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";
import { useInView } from "framer-motion";
import { Clear, ChevronLeft, ChevronRight } from "@mui/icons-material";

const Grid = ({ blok, sectionTheme }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [animatedContent, setAnimatedContent] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Store items with both URL and caption
  const [imageData, setImageData] = useState([]); // [{ url, caption }, ...]
  const [currentURL, setCurrentURL] = useState("");
  const [caption, setCaption] = useState("");

  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.08,
  });

  useEffect(() => {
    setAnimatedContent(blok.animatedContent);
  }, [blok.animatedContent]);

  // Extract both image URL and caption safely
  useEffect(() => {
    const body = blok.columns || [];
    const extractedData = body
      .filter((x) => x.component === "image" && x.image?.filename)
      .map((x) => ({
        url: x.image.filename,
        caption: x.caption || "",
      }));

    setImageData(extractedData);
  }, [blok.columns]);

  useEffect(() => {
    setIsAnimated(isInView);
  }, [isInView]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentURL("");
    setCaption("");
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = imageData.findIndex((item) => item.url === currentURL);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % imageData.length;
      setCurrentURL(imageData[nextIndex].url);
      setCaption(imageData[nextIndex].caption);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = imageData.findIndex((item) => item.url === currentURL);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + imageData.length) % imageData.length;
      setCurrentURL(imageData[prevIndex].url);
      setCaption(imageData[prevIndex].caption);
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
            className={clsx(
              "flex absolute top-4 right-4 gap-x-4 z-30 p-2 bg-black text-white border border-white",
              "hover:bg-black hover:text-white hover:border-accent"
            )}
            aria-label="Close modal"
          >
            <span className="h-6 w-6 flex items-center justify-center">
              <Clear />
            </span>
          </button>

          {/* Previous Button */}
          {imageData.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 p-4 gap-x-4 bg-black text-white border border-white hover:bg-black hover:text-white hover:border-accent z-30"
              aria-label="Previous image"
            >
              <span className="h-6 w-6 flex items-center justify-center">
                <ChevronLeft />
              </span>
            </button>
          )}

          {/* Image Container */}
          <div className="relative max-h-[95vh] max-w-full object-contain bg-white shadow-lg">
            <img src={currentURL} alt="Lightbox view" />
            {caption && (
              <div className="absolute w-full p-4 max-w-caption bg-white border text-center bottom-2 left-[50%] translate-x-[-50%]">
                {caption}
              </div>
            )}
          </div>

          {/* Next Button */}
          {imageData.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 p-4 gap-x-4 bg-black text-white border border-white hover:bg-black hover:text-white hover:border-accent z-30"
              aria-label="Next image"
            >
              <span className="h-6 w-6 flex items-center justify-center cursor-pointer">
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
          setCaption={setCaption}
        />
      ))}
      {openModal ? renderImageModal() : null}
    </div>
  );
};

export default Grid;