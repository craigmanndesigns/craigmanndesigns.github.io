import React, { useState } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";

import { RandomReveal } from "react-random-reveal";

const Hero = ({ blok, sectionTheme }) => {
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
      key={blok._uid}
      className={clsx(
        "text-center flex flex-col min-h-hero justify-center uppercase border w-full max-w-default",
        "max-sm:max-w-full",
        "px-20",
        sectionTheme === "light" ? "border-black" : "border-white"
      )}
    >
      {blok.alternate ? renderAltHero() : renderHero()}
    </div>
  );

  function renderHero() {
    return (
      <>
        <h2>{blok.prefix}</h2>
        {/* <h1>{blok.h1}</h1> */}
        <h1 onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          {/* {isHover ? ( */}
          <RandomReveal
            isPlaying={!isHover}
            duration={Infinity}
            revealDuration={1}
            updateInterval={1.5}
            characters={" "}
            // onComplete={() => setIsPlaying(false)}
            characterSet={[
              "Design",
              "Build",
              "do UX",
              "Draw",
              "Create",
              "Prettify",
            ]}
          />
          {/* ) : (
          <div>{blok.h1}</div>
        )} */}
        </h1>
        <h2>{blok.suffix}</h2>
        {/* <h2>You</h2>
            <h1>Pay.</h1> */}
      </>
    );
  }

  function renderAltHero() {
    return (
      <>
        <h2>{blok.prefix}</h2>
        <h1>{blok.h1}</h1>
        <h2>{blok.suffix}</h2>
      </>
    );
  }
};

export default Hero;
