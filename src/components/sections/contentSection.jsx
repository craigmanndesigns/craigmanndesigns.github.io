import React, { useState, useEffect, useRef } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";
import { useTheme } from "@mui/material";
import { useInView } from "framer-motion";

import useWindowWidth from "../../hooks/useWindowWidth";

// Helper to convert heading text to URL slug
const slugify = (text) => {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

const ContentSection = ({ blok }) => {
  const [backgroundTheme, setBackgroundTheme] = useState();
  const [sectionTheme] = useState(blok.theme);
  const [isAnimated, setIsAnimated] = useState();
  const [onMobile, setOnMobile] = useState(false);
  const [tocItems, setTocItems] = useState([]);

  const mainContent = true;

  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.1,
  });

  let theme = useTheme();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth >= 800) {
      setOnMobile(true);
    }
  }, [windowWidth]);

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
  }, [isInView, blok.theme, theme]);

  // Extract all H3 headings across all components in blok.main
  useEffect(() => {
    const extractedHeadings = [];

    const traverse = (node) => {
      if (!node) return;

      // Match Storyblok rich text heading nodes of level 3
      if (node.type === "heading" && node.attrs?.level === 2 || node.attrs?.level === 3) {
        const text = node.content?.map((c) => c.text).join("") || "";
        if (text) {
          extractedHeadings.push({
            level: node.attrs.level,
            text,
            id: slugify(text),
          });
        }
      }
      // Check for arrays or nested objects
      if (Array.isArray(node)) {
        node.forEach(traverse);
      } else if (typeof node === "object") {
        Object.keys(node).forEach((key) => traverse(node[key]));
      }
    };

    if (blok.main) {
      traverse(blok.main);
      setTocItems(extractedHeadings);
    }
  }, [blok.main]);

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
          "max-lg:col-full max-sm:col-full"
        )}
      >
        {blok.main.map((blokItem) => (
          <StoryblokComponent
            key={blokItem._uid}
            blok={blokItem}
            backgroundTheme={backgroundTheme}
            sectionTheme={sectionTheme}
            isInView={isInView}
            mainContent={mainContent}
          />
        ))}
      </div>

      {/* Sticky Side Bar / TOC Column */}
      <div className={clsx("col-sixth", onMobile ? "block" : "hidden")}>
        <div className={clsx("sticky top-20 flex flex-col gap-6")}>
          {/* Section-level Table of Contents */}
          {/* <TableOfContents items={tocItems} /> */}
          {blok.side_content?.map((blokItem) => (
            <StoryblokComponent
              key={blokItem._uid}
              blok={blokItem}
              sectionTheme={sectionTheme}
              items={tocItems}
            />
          ))}

          {/* Additional Side Content from Storyblok */}
          {/* <div>
            {blok.side_content?.map((blokItem) => (
              <StoryblokComponent
                key={blokItem._uid}
                blok={blokItem}
                sectionTheme={sectionTheme}
              />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;