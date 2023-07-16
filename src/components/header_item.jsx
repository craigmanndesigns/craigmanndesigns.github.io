import React, { useState, useEffect } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";

import { useTheme } from "@mui/material";

const HeaderItem = ({ blok }) => {
  const [left, setLeft] = useState();
  const [right, setRight] = useState();
  const [bottom, setBottom] = useState();
  const [top, setTop] = useState();

  useEffect(() => {
    setLeft(blok.left);
    setRight(blok.right);
    setTop(blok.top);
    setBottom(blok.bottom);
  }, []);

  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={clsx([
        "p-2 bg-white absolute border border-black color-black",
      ])}
      style={{
        left: `${left}`,
        right: `${right}`,
        bottom: `${bottom}`,
        top: `${top}`,
      }}
    >
      {blok.content}
    </div>
  );
};

export default HeaderItem;
