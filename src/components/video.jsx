import React, { useEffect, useRef } from "react";
import { storyblokEditable } from "gatsby-source-storyblok";
import clsx from "clsx";

import { animate, stagger } from "framer-motion";

const Video = ({ blok, isAnimated, sectionTheme, animatedContent }) => {
  const cardWidth = blok.width;
  const ref = useRef(null);
  const staggerCards = stagger(0.5, { startDelay: 0.5 });

  useEffect(() => {
    if (animatedContent) {
      animate(
        ref.current,
        isAnimated
          ? { opacity: 1, transform: "translateY(-2rem)" }
          : { opacity: 0, transform: "translateY(0rem)" },
        {
          duration: 0.5,
          delay: isAnimated ? staggerCards : 0,
        }
      );
    }
  }, [isAnimated, animatedContent, staggerCards]);
  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={clsx(
        "card",
        "flex flex-col justify-end lg:col-default rounded h-fit",
        "md:col-quarter",
        "sm:col-sixth",
        cardWidth === "half" && "lg:col-half",
        cardWidth === "quarter" && "lg:col-quarter md:col-quarter",
        cardWidth === "full-width" && "lg:col-full",
        cardWidth === "sixth" && "lg:col-sixth",
        sectionTheme === "light" ? "hover:bg-dark-slate" : "hover:bg-white10"
      )}
      ref={ref}
    >
      {blok.image.filename && (
        <div className={clsx("p-2")}>
          <video className={clsx("width-full")} controls>
            <source src={blok.video.filename} type="video/mp4" />
            <track
              src="captions_en.vtt"
              kind="captions"
              srclang="en"
              label="english_captions"
            ></track>
          </video>
        </div>
      )}
    </div>
  );
};

export default Video;
