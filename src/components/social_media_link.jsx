import React, { useState } from "react";
import Link from "gatsby-link";
import { storyblokEditable } from "gatsby-source-storyblok";
import clsx from "clsx";

import { RandomReveal } from "react-random-reveal";

const SocialMediaLink = ({ blok }) => {
  const [isHover, setIsHover] = useState(false);

  function onMouseEnter() {
    setIsHover(true);
  }

  function onMouseLeave() {
    setIsHover(false);
  }

  return (
    <div
      {...storyblokEditable(blok)}
      className={clsx(
        "flex flex-col justify-end col-default text-center text-7xl font-serif",
        "max-md:col-half",
        "max-sm:col-full max-sm:text-5xl"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <a href={blok.link.url}>
        {isHover ? (
          <RandomReveal isPlaying duration={0.3} characters={blok.text} />
        ) : (
          <div>{blok.text}</div>
        )}
      </a>
    </div>
  );
};

export default SocialMediaLink;
