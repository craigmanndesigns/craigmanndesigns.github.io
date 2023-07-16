import React, { useState, useEffect } from "react";
import { Link } from "gatsby-link";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";
import { useTheme } from "@mui/material";
import { East } from "@mui/icons-material";
const Button = ({ blok, sectionTheme }) => {
  const [backgroundTheme, setBackgroundTheme] = useState();
  const [buttonStyle, setButtonStyle] = useState();
  const [shadowStyle, setShadowStyle] = useState();
  const [url, setURL] = useState(
    blok.link.linktype === "story"
      ? "/" + blok.link.cached_url
      : blok.link.cached_url
  );
  const [isHover, setIsHover] = useState(false);

  function onMouseEnter() {
    setIsHover(true);
  }

  function onMouseLeave() {
    setIsHover(false);
  }
  useEffect(() => {
    if (sectionTheme === "light") {
      setButtonStyle("bg-white text-black border border-black");
      setShadowStyle("bg-black border border-white");
      {
        /* outlined */
      }
      if (blok.variant === "outlined") {
        setButtonStyle("bg-white text-black border border-black");
        setShadowStyle("border border-black");
      }
      {
        /* text */
      }
      if (blok.variant === "text") {
        setButtonStyle("bg-transparent text-black");
      }
    } else {
      setButtonStyle(
        "bg-white text-black border hover:bg-black hover:text-white hover:border-white"
      );
      setShadowStyle("bg-black border border-white");

      {
        /* outlined */
      }
      if (blok.variant === "outlined") {
        setButtonStyle(
          "bg-black text-white border border-white hover:bg-white hover:text-black"
        );
        setShadowStyle("border border-white");
      }
      {
        /* text */
      }
      if (blok.variant === "text") {
        setButtonStyle("bg-transparent text-white");
      }
    }
  }, [sectionTheme]);
  let theme = useTheme();
  return (
    <div {...storyblokEditable(blok)} className="flex justify-center">
      {blok.link.linktype === "story"
        ? renderInternalButton()
        : renderExternalButton()}
    </div>
  );

  function renderInternalButton() {
    return (
      <Link
        className={clsx("relative mb-4")}
        to={blok.link.cached_url}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span
          className={clsx(
            "flex items-center justify-middle items-center uppercase",
            "px-8 p-6 z-10",
            "relative",
            "butt",
            buttonStyle
          )}
        >
          {blok.cta}
          <span
            className={clsx(
              "ml-2 transition-transform delay-300",
              isHover ? "translate-x-1" : "translate-y-0"
            )}
          >
            <East />
          </span>
        </span>
        <div
          className={clsx(
            "absolute inset-0 w-full h-full",
            sectionTheme === "light" ? "bg-black" : "bg-accent",
            "transition-all",
            shadowStyle
          )}
        />
      </Link>
    );
  }
  function renderExternalButton() {
    return (
      <a
        className={clsx("relative mb-4")}
        href={url}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span
          className={clsx(
            "flex items-center justify-middle items-center uppercase",
            "px-8 p-6 z-10",
            "relative",
            "butt",
            buttonStyle
          )}
        >
          {blok.cta}
          <span
            className={clsx(
              "ml-2 transition-transform",
              isHover ? "translate-x-1" : "translate-y-0"
            )}
          >
            <East />
          </span>
        </span>
        <div
          className={clsx(
            "absolute inset-0 w-full h-full",
            shadowStyle,

            "transition-all",
            "butt-shadow"
          )}
        />
      </a>
    );
  }
};

export default Button;
