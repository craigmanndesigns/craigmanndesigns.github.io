import React, { useEffect, useState } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import { render, NODE_HEADING } from "storyblok-rich-text-react-renderer";
import clsx from "clsx";
import { RandomReveal } from "react-random-reveal";

const slugify = (text) => {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

const getPlainText = (children) => {
  if (!children) return "";
  if (typeof children === "string" || typeof children === "number") return children;
  if (Array.isArray(children)) return children.map(getPlainText).join("");
  if (children.props && children.props.children) return getPlainText(children.props.children);
  return "";
};

const Header = ({ blok, isInView, mainContent, sectionTheme }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHover, setIsHover] = useState(false);
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
    setAnimatedHeader(
      isInView ? (
        <RandomReveal isPlaying duration={1} characters={blok.animatedTitle} />
      ) : (
        <>{blok.animatedTitle}</>
      )
    );
  }, [isInView, blok.animatedTitle]);

  useEffect(() => {
    if (blok.alignment === "left") {
      setAlignedText("items-start");
      setTextAlign("text-left");
    } else if (blok.alignment === "center") {
      setAlignedText("items-center");
      setTextAlign("text-center");
    } else if (blok.alignment === "right") {
      setAlignedText("items-end");
      setTextAlign("text-right");
    }
  }, [blok.alignment]);

  // Attach IDs to H3 tags matching the slugify logic
  const richTextOptions = {
    nodeResolvers: {
      [NODE_HEADING]: (children, { level }) => {
        if (level === 2) {
          const textContent = getPlainText(children);
          const id = slugify(textContent);

          return (
            <h2 id={id} className="scroll-mt-24">
              {children}
            </h2>
          );
        }
        if (level === 3) {
          const textContent = getPlainText(children);
          const id = slugify(textContent);

          return (
            <h3 id={id} className="scroll-mt-24">
              {children}
            </h3>
          );
        }
        const Tag = `h${level}`;
        return <Tag>{children}</Tag>;
      },
    },
  };

  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={clsx([
        "w-full",
        "max-sm:text-center",
        "overflow-x-hidden",
        isScrolling && "group",
      ])}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={clsx(
          isScrolling
            ? "overflow-hidden flex w-fit max-md:min-h-scrollTab"
            : "flex flex-col max-sm:items-center gap-8",
          alignedText,
          textAlign
        )}
      >
        {renderStaticHeader()}
      </div>
    </div>
  );

  function renderStaticHeader() {
    return (
      <>
        {blok.animatedTitle && (
          <h2>
            <span className="accent">{animatedHeader}</span>
          </h2>
        )}
        <div
          className={clsx(
            mainContent ? "max-w-80" : "max-w-40",
            textAlign,
            "content max-sm:max-w-full max-sm:text-center",
            sectionTheme === "light" ? "text-wht" : "text-blk"
          )}
        >
          <div
            className={clsx(
              sectionTheme === "light" ? "text-black80 light" : "text-light-slate dark"
            )}
          >
            {render(blok.text, richTextOptions)}
          </div>
        </div>
      </>
    );
  }
};

export default Header;