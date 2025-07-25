import React, { useState, useEffect } from "react";
import { storyblokEditable } from "gatsby-source-storyblok";
import clsx from "clsx";

const HeaderItem = ({ blok, delay, perspective }) => {
  const [shadowStyle, setShadowStyle] = useState({ boxShadow: 'calc(-0.1em*(1 + 0}))) calc(.1em*(1 + 0)) 0 var(--neutral-black-color)' });

  useEffect(() => {
    setShadowStyle({
      '--perspective-x': `${perspective.x}`,
      '--perspective-y': `${perspective.y}`,
      boxShadow: `calc(-0.1em*(1 + var(--perspective-y))) calc(.1em*(1 + var(--perspective-x))) 0 var(--neutral-black-color)`,
      animationDelay: `-${delay}`
    });
  }, [perspective]);
  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={clsx([
        "absolute border border-black color-black font-bold",
        "moon",
        blok.invisible ? "hidden" : "p-4 bg-white"
      ])}
      style={shadowStyle}
    >
      {blok.content && blok.content}
    </div>
  );
};

export default HeaderItem;
