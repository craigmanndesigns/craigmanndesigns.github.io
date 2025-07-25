import React, { useState, useEffect } from "react";
import { storyblokEditable } from "gatsby-source-storyblok";

import clsx from "clsx";

const Tag = ({ blok, sectionTheme, isHover }) => {
  const [tagStyle, setTagStyle] = useState();

  useEffect(() => {
    sectionTheme === "light"
      ? setTagStyle("bg-white text-black")
      : setTagStyle("bg-black text-white");
  }, [sectionTheme]);
  console.log(isHover)

  return (
    <div {...storyblokEditable(blok)} className={clsx("flex justify-center")}>
      <div className={clsx(tagStyle, "tag", "py-3 px-4 text-xl font-bold rounded-md", "transition-all duration-500 ease-in-out", isHover ? "opacity-100" : "opacity-0 translate-y-full")}>{blok.text}</div>
    </div>
  );
};

export default Tag;
