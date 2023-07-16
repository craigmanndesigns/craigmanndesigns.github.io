import React, { useState, useEffect } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";

import { useTheme } from "@mui/material";
import { useRef } from "react";
import { useInView } from "framer-motion";

const Section = ({ blok, mainContent }) => {
  const [backgroundTheme, setBackgroundTheme] = useState();
  const [sectionTheme, setSectionTheme] = useState(blok.theme);
  const [isFullWidth, setIsFullWidth] = useState();
  const [isAnimated, setIsAnimated] = useState();
  const [paddingY, setPaddingY] = useState("");
  const [spacing, setSpacing] = useState("");
  const [height, setHeight] = useState("");

  const ref = useRef(null);
  const isInView = useInView(ref);

  let theme = useTheme();

  useEffect(() => {
    setBackgroundTheme(
      blok.theme === "light"
        ? theme.mode.light.background
        : theme.mode.dark.background
    );
    setIsAnimated(
      blok.id === "work"
        ? {
            transform: isInView ? "translateY(0rem)" : "translateY(5rem)",
            opacity: isInView ? 1 : 0,
            transition: "all 1s ease-in-out",
          }
        : { opacity: 1 }
    );
  }, [
    isInView,
    theme.mode.light.background,
    theme.mode.dark.background,
    blok.id,
    blok.theme,
  ]);

  useEffect(() => {
    if (blok.px_padding === "fw") {
      setIsFullWidth("px-0 max-md:px-0 max-sm:px-4");
    }
    if (blok.px_padding === "content") {
      setIsFullWidth("px-20 max-md:px-4 max-sm:px-4");
    } else {
      setIsFullWidth("px-4 max-md:px-0 max-sm:px-4");
    }
  }, [blok.px_padding]);

  useEffect(() => {
    setPaddingY(
      blok.padding === "20" ? "py-20 max-md:py-8 max-sm:py-8" : "py-4"
    );
    setSpacing(blok.spacing === "20" ? "gap-20" : "gap-10");
    setHeight(
      blok.full_height ? "min-h-default max-md:min-h-defaultTab" : "px-12"
    );
  }, []);
  return <>{mainContent ? renderWorkSection() : renderSection()}</>;

  function renderSection() {
    return (
      <section
        {...storyblokEditable(blok)}
        key={blok._uid}
        className={clsx(
          "flex flex-col justify-center items-center w-full",
          height,
          "last:pb-20",
          isFullWidth,
          paddingY,
          spacing,
          blok.theme === "light"
            ? "bg-white text-black"
            : "bg-black text-white",
          mainContent && "border overflow-x-hidden"
        )}
        id={blok.id}
        ref={blok.isAnimated ? ref : null}
        style={isAnimated}
      >
        {blok.main.map((blok) => (
          <StoryblokComponent
            blok={blok}
            backgroundTheme={backgroundTheme}
            sectionTheme={sectionTheme}
            isInView={isInView}
          />
        ))}
      </section>
    );
  }
  function renderWorkSection() {
    return (
      <section
        {...storyblokEditable(blok)}
        key={blok._uid}
        className={clsx(
          "flex flex-col justify-center items-center w-full",
          "rounded-none",
          "first:rounded-none",
          "p-8",
          "max-md:p-6",
          "max-sm:p-4",
          blok.theme === "light"
            ? "bg-white text-black"
            : "bg-black text-white",
          mainContent && "border overflow-x-hidden"
        )}
        id={blok.id}
        ref={blok.isAnimated ? ref : null}
        style={isAnimated}
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
      </section>
    );
  }
};

export default Section;
