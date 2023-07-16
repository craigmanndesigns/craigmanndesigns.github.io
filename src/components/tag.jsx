import React, { useState, useEffect } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";

import clsx from "clsx";

const Tag = ({ blok, sectionTheme }) => {
  const [tagStyle, setTagStyle] = useState();

  useEffect(() => {
    sectionTheme === "light"
      ? setTagStyle("bg-black10 text-black")
      : setTagStyle("bg-white10 text-accent");
  }, [sectionTheme]);

  return (
    <div {...storyblokEditable(blok)} className={clsx("flex justify-center")}>
      <div className={clsx(tagStyle, "tag", "p-1.5 text-sm")}>{blok.text}</div>
    </div>
  );
};

export default Tag;
