import React, { useEffect, useState, useRef } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";
import { Link } from "gatsby-link";

import { animate, stagger } from "framer-motion";

const Card = ({ blok, isAnimated, sectionTheme, animatedContent }) => {
  const cardWidth = blok.width;
  const ref = useRef(null);
  const staggerCards = stagger(1, { startDelay: 0.5 });
  const [url, setURL] = useState("/" + blok.link.cached_url);
  const [isHover, setIsHover] = useState(false);
  const [bgImage, setBgImage] = useState('');

  function onMouseEnter() {
    setIsHover(true);
  }

  function onMouseLeave() {
    setIsHover(false);
  }

  return (
    <Link
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={clsx(
        "card overflow-hidden relative",
        "flex flex-col justify-end lg:col-half aspect-square rounded-md h-fit",
        "md:col-quarter",
        "max-sm:col-sixth border border-light-slate",
        cardWidth === "half" && "lg:col-half",
        cardWidth === "quarter" && "lg:col-quarter md:col-quarter",
        cardWidth === "full-width" && "col-full",
        // sectionTheme === "light" ? "hover:bg-black10" : "hover:bg-dark-slate",
        animatedContent && "opacity-0 translate-y-0"
      )}
      ref={ref}
      to={url}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >

      {blok.image.filename && (
        <div className={clsx("h-full scale-100 hover:scale-125", "transition-all duration-500 ease-in-out")}>
          {isHover ? renderOverlay() : <></>}

          <div
            style={{ '--image-url': `url(${blok.image.filename})` }}
            className='bg-[image:var(--image-url)] bg-cover bg-center w-full h-full' />
        </div>
      )}
      <div className={clsx("absolute left-4 bottom-4 flex flex-col items-start gap-2", "pointer-events-none")}>
        {blok.tags.map((blok) => (
          <StoryblokComponent blok={blok} sectionTheme={sectionTheme} isHover={isHover} />
        ))}
        <div className={clsx("py-3 px-4", "border border-black color-black bg-white opacity-100", "transition-all duration-500 ease-in-out")}>
          <h4 className={clsx("break-word m-0 text-black")}>{blok.title}</h4>
        </div>

      </div>

    </Link>
  );
  function renderOverlay() {
    return (
      <div
        className={clsx(
          "absolute w-full h-full top-0 left-0 flex items-center justify-center bg-black80 z-10", "opacity-0 hover:opacity-75", "transition-all duration-500 ease-in-out"
        )}
      >
      </div>
    );
  }
};

export default Card;
