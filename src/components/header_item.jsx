import React, { useState, useEffect } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";

const HeaderItem = ({ blok, delay }) => {

  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={clsx([
        "p-2 bg-white absolute border border-black color-black",
        "moon"
      ])}
      style={{ animationDelay: `-${delay}` }}
    >
      {blok.content}
    </div>
  );
};

export default HeaderItem;
