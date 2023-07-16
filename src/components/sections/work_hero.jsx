import React from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";

const WorkHero = ({ blok, sectionTheme }) => {
  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={clsx(
        "text-center flex flex-col min-h-defaultMob justify-center uppercase border w-full max-w-default p-2",
        "max-sm:max-w-full",
        "work-hero",
        sectionTheme === "light" ? "border-black" : "border-white"
      )}
    >
      <h1>{blok.title}</h1>
    </div>
  );
};

export default WorkHero;
