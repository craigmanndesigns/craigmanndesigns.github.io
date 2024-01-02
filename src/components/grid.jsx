import React, { useEffect, useRef, useState } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";
import Lightbox from "react-awesome-lightbox";
// You need to import the CSS only once
import "react-awesome-lightbox/build/style.css";
import { useInView } from "framer-motion";

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
  }, []);

  useEffect(() => {
    const body = blok.columns || [];
    body.forEach((x) => {
      if (x.component === "image") {
        images.push({ url: x.image.filename });
      }
    });
  }, [blok.columns]);
  useEffect(() => {
    if (currentURL != "") {
      const index = 0;
      const value = currentURL;
      images.splice(index, 0, value);
    }
  }, [openModal]);

  useEffect(() => {
    setIsAnimated(isInView);
  }, [isInView]);
  const handleShowModal = () => {
    setOpenModal(false);
  };
  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={clsx(
        "w-full grid lg:grid-cols-12 lg:gap-x-4 lg:gap-y-8 items-end",
        "md:grid-cols-6",
        "max-sm:grid-cols-2 max-sm:gap-y-12",
        "mt-8"
      )}
      ref={ref}
    >
      {blok.columns.map((blok) => (
        <StoryblokComponent
          blok={blok}
          isAnimated={isAnimated}
          animatedContent={animatedContent}
          setCurrentURL={setCurrentURL}
          setOpenModal={setOpenModal}
          sectionTheme={sectionTheme}
        />
      ))}
      {openModal ? renderImageModal() : <></>}
    </div>
  );
  function renderImageModal() {
    return (
      <div
        {...storyblokEditable(blok)}
        key={blok._uid}
        className={clsx("w-full")}
        ref={ref}
      >
        <Lightbox
          images={images}
          allowRotate={false}
          onClose={handleShowModal}
        />
      </div>
    );
  }
};

export default Grid;
