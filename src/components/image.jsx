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
  setCaption,
}) => {
  const cardWidth = blok.width;
  const ref = useRef(null);
  const caption = blok.caption ? blok.caption : "";

  const handleShowModal = () => {
    setCurrentURL(blok.image.filename);
    setOpenModal(true);
    setCaption(blok.caption);
  };
  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={clsx(
        "card",
        "flex flex-col justify-end lg:col-default rounded h-fit border border-tableDark",
        "md:col-quarter",
        "max-sm:col-sixth max-sm:border max-sm:border-light-slate",
        cardWidth === "half" && "lg:col-half",
        cardWidth === "quarter" && "lg:col-quarter md:col-quarter",
        cardWidth === "full-width" && "col-full",
        sectionTheme === "light" ? "hover:bg-black10 hover:border-accent" : "hover:bg-dark-slate hover:border-accent",
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
