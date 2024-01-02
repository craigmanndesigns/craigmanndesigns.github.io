import React, { useEffect, useState } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import { render } from "storyblok-rich-text-react-renderer";
import clsx from "clsx";

import { useTheme } from "@mui/material";

const ButtonWrapper = ({ blok, sectionTheme, sectionBG }) => {
  let theme = useTheme();

  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={clsx([
        "w-full flex flex-col gap-10 justify-center items-center",
      ])}
    >
      <div className={clsx("text-center max-w-40 max-sm:max-w-full")}>
        {render(blok.text)}
      </div>
      <div
        className={clsx(
          "flex gap-8 justify-center items-center",
          "max-sm:flex-col-reverse"
        )}
      >
        {blok.button.map((blok) => (
          <StoryblokComponent
            blok={blok}
            sectionTheme={sectionTheme}
            sectionBG={sectionBG}
          />
        ))}
      </div>
    </div>
  );
};

export default ButtonWrapper;
