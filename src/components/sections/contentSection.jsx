import React, { useState, useEffect, ComponentProps } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";

import { useTheme } from "@mui/material";
import { useRef } from "react";
import { useInView } from "framer-motion";

import useWindowWidth from "../../hooks/useWindowWidth";

const ContentSection = ({ blok }) => {
  const [backgroundTheme, setBackgroundTheme] = useState();
  const [sectionTheme, setSectionTheme] = useState(blok.theme);
  const [isAnimated, setIsAnimated] = useState();
  const [onMobile, setOnMobile] = useState(false);

  const mainContent = true;

  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.1,
  });

  let theme = useTheme();

  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth >= 420) {
      setOnMobile(true);
    }
  }, []);

  useEffect(() => {
    setBackgroundTheme(
      blok.theme === "light"
        ? theme.mode.light.background
        : theme.mode.dark.background
    );
    setIsAnimated({
      transform: isInView ? "translateY(0rem)" : "translateY(5rem)",
      opacity: isInView ? 1 : 0,
      transition: "all 1s ease-in-out",
    });
  }, [isInView]);

  useEffect(() => {
    let parent = document.querySelector(".sticky").parentElement;

    while (parent) {
      const hasOverflow = getComputedStyle(parent).overflow;
      if (hasOverflow !== "visible") {
        console.log(hasOverflow, parent);
      }
      parent = parent.parentElement;
    }
  }, []);
  return (
    <section
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={clsx(
        "grid grid-cols-12 w-full",
        "py-20",
        "px-4",
        "gap-x-4",
        blok.theme === "light" ? "bg-white text-black" : "bg-black text-white"
      )}
      id={blok.id}
      ref={blok.isAnimated ? ref : null}
    >
      <div
        className={clsx(
          "flex flex-col justify-center items-center w-full rounded-2xl col-content",
          "gap-20",
          "max-md:col-full",
          "max-sm:col-full"
        )}
      >
        {blok.main.map((blok) => (
          <StoryblokComponent
            blok={blok}
            backgroundTheme={backgroundTheme}
            sectionTheme={sectionTheme}
            isInView={isInView}
            mainContent={mainContent}
          />
        ))}
      </div>
      <div className={clsx("col-sixth", onMobile ? "block" : "hidden")}>
        <div className={clsx("border sticky top-4")}>
          <h5 className={clsx("p-4 bg-black text-white border-b mb-2")}>
            {blok.side_title}
          </h5>
          <div className={clsx("py-2")}>
            {blok.side_content.map((blok) => (
              <StoryblokComponent blok={blok} sectionTheme={sectionTheme} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
