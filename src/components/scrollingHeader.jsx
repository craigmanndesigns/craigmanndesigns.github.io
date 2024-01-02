import React, { useEffect, useState } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import { render } from "storyblok-rich-text-react-renderer";
import clsx from "clsx";

import { useTheme } from "@mui/material";

const Header = ({ blok }) => {
  let theme = useTheme();
  const [isScrolling, setIsScrolling] = useState();

  useEffect(() => {
    setIsScrolling(blok.isScrolling);
  }, [blok.isScrolling]);

  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={clsx([
        "width-full",
        `text-${blok.alignment}`,
        isScrolling && "max-w-full",
      ])}
    >
      <div className={clsx("flex flex-col items-end", isScrolling && "w-min")}>
        <h3 className={clsx(isScrolling && "w-max")}>{blok.title}</h3>
        <div className={clsx("max-w-40")}>{render(blok.text)}</div>
      </div>
    </div>
  );
};

export default Header;
