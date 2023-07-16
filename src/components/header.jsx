import React, { useEffect, useState } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import { render } from "storyblok-rich-text-react-renderer";
import clsx from "clsx";

import { RandomReveal } from "react-random-reveal";

const Header = ({ blok, isInView, mainContent }) => {
  const [isScrolling, setIsScrolling] = useState();
  const [isHover, setIsHover] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);
  const [animatedHeader, setAnimatedHeader] = useState(<></>);

  const [alignedText, setAlignedText] = useState("");
  const [textAlign, setTextAlign] = useState("");

  function onMouseEnter() {
    setIsHover(true);
  }

  function onMouseLeave() {
    setIsHover(false);
  }

  useEffect(() => {
    setIsScrolling(blok.isScrolling);
  }, [blok.isScrolling]);

  useEffect(() => {
    isInView && setAnimateHeader(true);
    setAnimatedHeader(
      isInView ? (
        <RandomReveal isPlaying duration={1} characters={blok.animatedTitle} />
      ) : (
        <>{blok.animatedTitle}</>
      )
    );
  }, [isInView]);
  useEffect(() => {
    if (blok.alignment === "left") {
      setAlignedText("items-start");
      setTextAlign("text-left");
    }
    if (blok.alignment === "center") {
      setAlignedText("items-center");
      setTextAlign("text-center");
    } else if (blok.alignment === "right") {
      setAlignedText("items-end");
      setTextAlign("text-right");
    }
  }, []);
  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={clsx([
        "w-full",
        "max-sm:text-center",
        "overflow-x-hidden",
        isScrolling && "group",
        "min-h-[15rem]",
      ])}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={clsx(
          isScrolling
            ? "min-h-scroll flex w-fit max-md:min-h-scrollTab"
            : "flex flex-col max-sm:items-center gap-8",
          alignedText
        )}
      >
        {isScrolling ? renderScrollingHeader() : renderStaticHeader()}
      </div>
    </div>
  );

  function renderScrollingHeader() {
    return (
      <>
        <div
          className="relative animate-scroll"
          style={
            isHover
              ? { animationPlayState: "paused" }
              : { animationPlayState: "running" }
          }
        >
          <h3 className={clsx("whitespace-nowrap", "scrolling-header")}>
            {blok.animatedTitle}
          </h3>
          {blok.header_items.map((blok) => (
            <StoryblokComponent blok={blok} />
          ))}
        </div>
        <div
          className="relative animate-scroll"
          style={
            isHover
              ? { animationPlayState: "paused" }
              : { animationPlayState: "running" }
          }
        >
          <h3 className={clsx("whitespace-nowrap")}>{blok.animatedTitle}</h3>
          {blok.header_items.map((blok) => (
            <StoryblokComponent blok={blok} />
          ))}
        </div>
      </>
    );
  }
  function renderStaticHeader() {
    return (
      <>
        <h3>
          <span className="accent">{animatedHeader}</span>
        </h3>
        <div
          className={clsx(
            mainContent ? "max-w-80" : "max-w-40",
            textAlign,
            "max-sm:max-w-full max-sm:text-center",
            "text-blk"
          )}
        >
          {render(blok.text)}
        </div>
      </>
    );
  }
};

export default Header;
