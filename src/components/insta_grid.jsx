import React, { useEffect, useState, useRef } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";

const InstaGrid = ({ items }) => {
  if (items.length === 0) {
    return <div>I done fucked it</div>;
  }

  return (
    <div
      className={clsx(
        "w-full grid lg:grid-cols-12 lg:gap-x-4 lg:gap-y-8 items-end"
      )}
    >
      {items.map((item) => (
        <div
          className={clsx(
            "flex flex-col justify-end rounded",
            "lg:col-quarter md:col-quarter"
          )}
        >
          <img src={item.mediaUrl} />
        </div>
      ))}
    </div>
  );
};

export default InstaGrid;
