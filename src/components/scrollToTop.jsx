import React, { useState, useEffect } from "react";
import { Link } from "gatsby-link";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";
import { useTheme } from "@mui/material";
import { North } from "@mui/icons-material";
const ScrollToTop = ({ blok, sectionTheme }) => {
  const [showButton, setShowButton] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    scrollPosition <= 1300 ? setShowButton(true) : setShowButton(false);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  const scrollUp = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <button
      className={clsx(
        "fixed right-10 bottom-10",
        "bg-white scrollButton border border-black",
        "px-6 py-5",
        "scrollTransition",
        showButton ? "opacity-0 bottom-[-10vh]" : "opacity-100 bottom-10"
      )}
      onClick={scrollUp}
    >
      BACK TO THE TOP
    </button>
  );
};

export default ScrollToTop;
