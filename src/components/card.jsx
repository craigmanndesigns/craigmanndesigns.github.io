import React, { useEffect, useState, useRef } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import { render } from "storyblok-rich-text-react-renderer";
import clsx from "clsx";
import { Link } from "gatsby-link";

import { animate, stagger } from "framer-motion";

const Card = ({ blok, isAnimated, sectionTheme, animatedContent }) => {
  const cardWidth = blok.width;
  const ref = useRef(null);
  const staggerCards = stagger(0.5, { startDelay: 0.5 });
  const [url, setURL] = useState("/" + blok.link.cached_url);
  const [isHover, setIsHover] = useState(false);

  function onMouseEnter() {
    setIsHover(true);
  }

  function onMouseLeave() {
    setIsHover(false);
  }

  useEffect(() => {
    if (animatedContent) {
      animate(
        ref.current,
        isAnimated && { opacity: 1, transform: "translateY(-2rem)" },
        {
          duration: 0.5,
          delay: isAnimated ? staggerCards : 0,
        }
      );
    }
  }, [isAnimated, animatedContent]);
  return (
    <Link
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
        animatedContent && "opacity-0 translate-y-0"
      )}
      ref={ref}
      to={url}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isHover && blok.link.cached_url === "" ? renderOverlay() : <></>}
      {/* {renderOverlay()} */}
      {blok.image.filename && (
        <div className={clsx("p-2")}>
          <img src={blok.image.filename} className={clsx("width-full")}></img>
        </div>
      )}
      <div className={clsx("p-2")}>
        <div
          className={clsx(
            "flex justify-between justify-middle items-center",
            "gap-x-2 mb-4"
            // "max-sm:flex-col max-sm:items-start"
          )}
        >
          <h4 className={clsx("break-word m-0")}>{blok.title}</h4>
          <div
            className={clsx(
              "flex flex-wrap ",
              "max-sm:flex-nowrap max-sm: gap-2",
              "justify-end"
            )}
          >
            {blok.tags.map((blok) => (
              <StoryblokComponent blok={blok} sectionTheme={sectionTheme} />
            ))}
          </div>
        </div>
        <div className={clsx("text-light-slate")}>{render(blok.body)}</div>
      </div>
    </Link>
  );
  function renderOverlay() {
    return (
      <div
        className={clsx(
          "absolute w-full h-full top-0 left-0 flex items-center justify-center bg-black80"
        )}
      >
        <span className={clsx("p-2 bg-white text-black")}>Coming soon</span>
      </div>
    );
  }
};

export default Card;
