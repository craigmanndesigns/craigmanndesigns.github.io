import React, { useEffect, useState, useRef } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";

import { animate, stagger } from "framer-motion";

const Image = ({
  blok,
  isAnimated,
  sectionTheme,
  animatedContent,
  setCurrentURL,
  setOpenModal,
}) => {
  const cardWidth = blok.width;
  const ref = useRef(null);
  const staggerCards = stagger(0.5, { startDelay: 0.5 });

  const handleShowModal = () => {
    setCurrentURL(blok.image.filename);
    setOpenModal(true);
  };

  useEffect(() => {
    if (animatedContent) {
      animate(
        ref.current,
        isAnimated && { opacity: 1, transform: "translateY(-2rem)" },
        // ? { opacity: 1, transform: "translateY(-2rem)" }
        // : { opacity: 0, transform: "translateY(0rem)" },
        {
          duration: 0.5,
          delay: isAnimated ? staggerCards : 0,
        }
      );
    }
  }, [isAnimated, animatedContent]);
  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={clsx(
        "card",
        "flex flex-col justify-end lg:col-default rounded h-fit",
        "md:col-quarter",
        "max-sm:col-sixth max-sm:border max-sm:border-light-slate",
        cardWidth === "half" && "lg:col-half",
        cardWidth === "quarter" && "lg:col-quarter md:col-quarter",
        cardWidth === "full-width" && "col-full",
        sectionTheme === "light" ? "hover:bg-black10" : "hover:bg-dark-slate",
        "opacity-0 translate-y-0"
      )}
      ref={ref}
      onClick={handleShowModal}
    >
      {blok.image.filename && (
        <div className={clsx("p-2")}>
          <img src={blok.image.filename} className={clsx("width-full")}></img>
        </div>
      )}
    </div>
  );
};

export default Image;
