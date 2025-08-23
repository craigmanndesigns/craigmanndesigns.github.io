import React, { useState, useEffect } from "react";
import { storyblokEditable } from "gatsby-source-storyblok";

import clsx from "clsx";

const Tag = ({ blok, sectionTheme, isHover }) => {
  const [tagStyle, setTagStyle] = useState();

  useEffect(() => {
    sectionTheme === "light"
      ? setTagStyle("bg-black text-black")
      : setTagStyle("bg-white text-white");
  }, [sectionTheme]);

  return (
    <div {...storyblokEditable(blok)} className={clsx("flex justify-center")}>
      <div className={clsx("border border-white color-white font-bold", "p-4 bg-black uppercase", "transition-all duration-500 ease-in-out", isHover ? "opacity-100" : "opacity-0 translate-y-full")}>{blok.text}</div>
    </div>
  );
};

export default Tag;
